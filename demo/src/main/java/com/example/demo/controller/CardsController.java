package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Cards;
import com.example.demo.service.CardsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CardsController {
    private final CardsService cardsService;

    //コンストラクタ
    public CardsController(CardsService cardsService) {
        this.cardsService = cardsService;
    }

    @GetMapping("/api/cards")
    public List<Cards> getCards() {
        return cardsService.findAll();
    }
}