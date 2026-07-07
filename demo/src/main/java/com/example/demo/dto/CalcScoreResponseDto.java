package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalcScoreResponseDto {
    private Integer cardId;
    private int finalScore;
  
    // //コンストラクタ
    // public CalcScoreResponseDto(Integer cardId, int finalScore){
    //     this.cardId = cardId;
    //     this.finalScore = finalScore;
    // }
    // public CalcScoreResponseDto(){}

    // //getter
    // public Integer getCardId(){
    //     return cardId;
    // }
    // public int getFinalScore(){
    //     return finalScore;
    // }

    // //setter
    // public void setCardId(Integer cardId){
    //     this.cardId = cardId;
    // }
    // public void setFinalScore(int finalScore){
    //     this.finalScore = finalScore;
    // }
}
