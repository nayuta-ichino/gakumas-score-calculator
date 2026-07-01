package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CalcScoreRequestDto {
    private Integer cardId;
    private int limitBreakCount;

    // //コンストラクタ
    // public CalcScoreRequestDto(Integer cardId, int limitBreakCount){
    //     this.cardId = cardId;
    //     this.limitBreakCount = limitBreakCount;
    // }
    // public CalcScoreRequestDto(){}

    // //getter
    // public Integer getCardId(){
    //     return cardId;
    // }
    // public int getLimitBreakCount(){
    //     return limitBreakCount;
    // }

    // //setter
    // public void setCardId(Integer cardId){
    //     this.cardId = cardId;
    // }
    // public void setLimitBreakCount(int limitBreakCount){
    //     this.limitBreakCount = limitBreakCount;
    // }
}
