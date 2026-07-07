package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CalcRequestDTO;
import com.example.demo.dto.CalcResponseDTO;
import com.example.demo.service.CardScoreService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CardScoreController {
    private final CardScoreService cardScoreService;

    //コンストラクタ
    public CardScoreController(CardScoreService cardScoreService){
        this.cardScoreService = cardScoreService;
    }

    //計算API
    @PostMapping("/api/calculate")
    public CalcResponseDTO calculate(@Valid @RequestBody CalcRequestDTO calcRequestDTO){
        return cardScoreService.calculate(calcRequestDTO);
    }
}
