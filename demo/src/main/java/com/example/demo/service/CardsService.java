package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Cards;
import com.example.demo.repository.CardsRepository;

@Service
public class CardsService {
    private final CardsRepository cardsRepository;

    //コンストラクタ
    public CardsService(CardsRepository cardsRepository) {
        this.cardsRepository = cardsRepository;
    }  

    public List<Cards> findAll() {
        return cardsRepository.findAll();
    }
}
