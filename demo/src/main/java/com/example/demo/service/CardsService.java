package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.CardsResponseDto;
import com.example.demo.dto.FormationRequestDTO;
import com.example.demo.dto.FormationResponseDTO;
import com.example.demo.entity.CardsEntity;
import com.example.demo.repository.CardsRepository;

@Service
public class CardsService {
    private final CardsRepository cardsRepository;

    //コンストラクタ
    public CardsService(CardsRepository cardsRepository) {
        this.cardsRepository = cardsRepository;
    }  

    //全件取得API
    public List<CardsEntity> findAll() {
        return cardsRepository.findAll();
    }

    //サポートカード編成API
    public FormationResponseDTO getFormation(FormationRequestDTO requestDto) {
        List<CardsEntity> entity = cardsRepository.findAllById(requestDto.getSlotList());
        return new FormationResponseDTO(entity);
    }

    //全件取得API(rarity_master,type_master,plan_master,event_get_master,event_master 連携)
    public List<CardsResponseDto> findAllDetail(){
        List<CardsEntity> cardsList = cardsRepository.findAll();
        
        //return cardsList.stream().map(card -> CardsResponseDto.EntityToDTO(card)).toList();
        return cardsList.stream().map(CardsResponseDto::fromEntity).toList();
    }
}
