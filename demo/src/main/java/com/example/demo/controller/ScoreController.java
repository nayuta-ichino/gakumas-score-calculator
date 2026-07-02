package com.example.demo.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CalcScoreRequestDto;
import com.example.demo.dto.CalcScoreResponseDto;
import com.example.demo.service.ScoreService;

@RestController
public class ScoreController {
    private final ScoreService scoreService;

    //コンストラクタ
    public ScoreController(ScoreService scoreService){
        this.scoreService = scoreService;
    }

    @PostMapping("/score")
    public CalcScoreResponseDto calculateFinalScore(@RequestBody CalcScoreRequestDto calcScoreRequestDto){
        return scoreService.calculateFinalScore(calcScoreRequestDto);
    }
}
