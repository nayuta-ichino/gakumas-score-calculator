package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.FormationRequestDTO;
import com.example.demo.dto.FormationResponseDTO;
import com.example.demo.entity.Cards;
import com.example.demo.repository.CardsRepository;

@Service
public class CardsService {
    private final CardsRepository cardsRepository;

    //コンストラクタ
    public CardsService(CardsRepository cardsRepository) {
        this.cardsRepository = cardsRepository;
    }  

    //全件取得API
    public List<Cards> findAll() {
        return cardsRepository.findAll();
    }

    //サポートカード編成API
    public FormationResponseDTO getFormation(FormationRequestDTO requestDto) {
        List<Cards> entity = cardsRepository.findAllById(requestDto.getSlotList());
        return new FormationResponseDTO(entity);
    }
}
