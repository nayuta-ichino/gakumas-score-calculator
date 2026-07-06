package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.FormationRequestDTO;
import com.example.demo.dto.FormationResponseDTO;
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

    //全件取得API
    @GetMapping("/api/cards")
    public List<Cards> getCards() {
        return cardsService.findAll();
    }

    //サポートカード編成API
    @PostMapping("/api/formation")
    public FormationResponseDTO getFormation(@RequestBody FormationRequestDTO requestDto) {
        return cardsService.getFormation(requestDto);
    }
}