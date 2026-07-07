package com.example.demo.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.domain.CardScore;
import com.example.demo.dto.CalcRequestDTO;
import com.example.demo.dto.CalcResponseDTO;
import com.example.demo.entity.CardScoreEntity;
import com.example.demo.repository.CardScoreRepository;

@Service
public class CardScoreService {
    private final CardScoreRepository cardScoreRepository;
    private final CardScore cardScore;

    //コンストラクタ
    public CardScoreService(CardScoreRepository cardScoreRepository, CardScore cardScore) {
        this.cardScoreRepository = cardScoreRepository;
        this.cardScore = cardScore;
    }

    //計算API
    public CalcResponseDTO calculate(CalcRequestDTO requestDto) {
        List<Integer> idList = requestDto.getIdList();
        List<Integer> limitBreakCountList = requestDto.getLimitBreakCountList();
        
        //ID指定で全検索
        List<CardScoreEntity> entityList = cardScoreRepository.findAllById(idList);

        //取得データをMap化
        Map<Long, CardScoreEntity> cardMap = entityList.stream().collect(Collectors.toMap(CardScoreEntity::getId, entity -> entity));
        
        //レスポンス用 スコア変数
        List<Integer> scoreList = new ArrayList<>(Collections.nCopies(6, 0));
        int totalScore = 0;
        
        /*
        * 1.凸数に応じてスコアを計算
        * 2.（スケジュール、カード取得回数の計算はいったん、後回し）
        */
        for(int i = 0; i < idList.size(); i++){
            Long cardId = idList.get(i).longValue();
            int cardLimitBreakCount = limitBreakCountList.get(i);

            if(cardId == 0){
                continue;
            }

            CardScoreEntity cardScoreEntity = cardMap.get(cardId);

            if(cardScoreEntity != null){
                //domain呼び出し&スコアを記入
                int result = cardScore.calculationCardScore(cardScoreEntity, cardLimitBreakCount);
                scoreList.set(i, result);
                totalScore += result;
            }
        }

        
        return new CalcResponseDTO(
            totalScore,
            scoreList.get(0),
            scoreList.get(1),
            scoreList.get(2),
            scoreList.get(3),
            scoreList.get(4),
            scoreList.get(5)
        );
    }
    
}
