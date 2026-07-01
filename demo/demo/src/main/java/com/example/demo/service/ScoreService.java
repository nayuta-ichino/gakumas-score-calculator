package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.domain.CardCalculation;
import com.example.demo.dto.CalcScoreRequestDto;
import com.example.demo.dto.CalcScoreResponseDto;
import com.example.demo.entity.CardEntity;
import com.example.demo.repository.CardRepository;

@Service
public class ScoreService {
    private final CardRepository cardRepository;
    private final CardCalculation cardCalculation;

    //コンストラクタ
    public ScoreService(CardRepository cardRepository, CardCalculation cardCalculation){
        this.cardRepository = cardRepository;
        this.cardCalculation = cardCalculation;
    }

    /*
    * 【処理内容】
    * 1.repositoryからデータ取得
    * 2.Domainに計算依頼
    * 3.controllerへ返却
    */
    public CalcScoreResponseDto calculateFinalScore(CalcScoreRequestDto requestDto){
        CardEntity cardEntity = cardRepository.findById(requestDto.getCardId()).orElseThrow(() -> new RuntimeException("カードが見つかりません。"));
        int finalScore = cardCalculation.calculateFinalScore(cardEntity, requestDto.getLimitBreakCount());
        return new CalcScoreResponseDto(requestDto.getCardId(), finalScore);
   }
}
