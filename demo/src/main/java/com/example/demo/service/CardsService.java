package com.example.demo.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.domain.CardScore;
import com.example.demo.dto.CalcRequestDTO;
import com.example.demo.dto.CalcResponseDTO;
import com.example.demo.dto.CardsResponseDto;
import com.example.demo.dto.FormationRequestDTO;
import com.example.demo.dto.FormationResponseDTO;
import com.example.demo.entity.CardsEntity;
import com.example.demo.projection.SQLResultInfomationProjection;
import com.example.demo.repository.CardsJdbcRepository;
import com.example.demo.repository.CardsRepository;

@Service
public class CardsService {
    private final CardsRepository cardsRepository;
    private final CardsJdbcRepository cardsJdbcRepository;
    private final CardScore cardScore;

    // コンストラクタ
    public CardsService(CardsRepository cardsRepository, CardsJdbcRepository cardsJdbcRepository, CardScore cardScore) {
        this.cardsRepository = cardsRepository;
        this.cardsJdbcRepository = cardsJdbcRepository;
        this.cardScore = cardScore;
    }

    // 全件取得API
    public List<CardsEntity> findAll() {
        return cardsRepository.findAll();
    }

    // サポートカード編成API
    public FormationResponseDTO getFormation(FormationRequestDTO requestDto) {
        List<CardsEntity> entity = cardsRepository.findAllById(requestDto.getSlotList());
        return new FormationResponseDTO(entity);
    }

    // 全件取得API(rarity_master,type_master,plan_master,event_get_master,event_master連携)
    public List<CardsResponseDto> findAllDetail() {
        List<CardsEntity> cardsList = cardsRepository.findAll();

        // return cardsList.stream().map(card ->
        // CardsResponseDto.EntityToDTO(card)).toList();
        return cardsList.stream().map(CardsResponseDto::fromEntity).toList();
    }

    // サポートカード点数計算API
    public CalcResponseDTO getFormationTotalScore(CalcRequestDTO calcRequestDTO) {
        // サポートカードアビリティと上昇値を取得(cards,limit_break_master連携)
        List<SQLResultInfomationProjection> projections = cardsJdbcRepository
                .cardsValueInfomation(calcRequestDTO.getIdList());

        // DBから取得したデータを多重MAP化
        Map<Integer, Map<Integer, Map<String, Double>>> ids = projections.stream()
                .filter(Objects::nonNull) // null除外
                .collect(
                        Collectors.groupingBy(
                                SQLResultInfomationProjection::getId,
                                Collectors.groupingBy(
                                        SQLResultInfomationProjection::getLimitBreak,
                                        Collectors.toMap(
                                                SQLResultInfomationProjection::getAbilityId,
                                                SQLResultInfomationProjection::getValue))));

        // 多重MAPからサポートカードIDと凸数で絞り込む
        Map<String, List<Double>> calcMap = new HashMap<>();
        for (int i = 0; i < calcRequestDTO.getIdList().size(); i++) {

            int requestId = calcRequestDTO.getIdList().get(i);
            int requestBreak = calcRequestDTO.getLimitBreakCountList().get(i);

            if (ids.containsKey(requestId) && ids.get(requestId).containsKey(requestBreak)) {
                // 該当する内側の Map<String, Double> を取得
                Map<String, Double> targetMap = ids.get(requestId).get(requestBreak);

                targetMap.forEach((ability_id, value) -> {
                    List<Double> valueList = new ArrayList<>();
                    valueList.add(value);

                    calcMap.merge(ability_id, valueList, (oldList, newList) -> {
                        // 元データ(oldList)を壊さないため[combinedList]を宣言
                        List<Double> combinedList = new ArrayList<>(oldList);
                        combinedList.addAll(newList);
                        return combinedList;
                    });
                });
            }
        }

        // スケジュール
        CalcRequestDTO.scheduleInfomation scheduleDTO = calcRequestDTO.getSchedule();
        // ユーザー入力欄
        CalcRequestDTO.userInputInfomation userInputDTO = calcRequestDTO.getUserInput();

        CalcResponseDTO dto = new CalcResponseDTO();
        dto.setTotalScore(cardScore.calculationCardScore(calcMap, scheduleDTO, userInputDTO));

        return dto;
    }
}
