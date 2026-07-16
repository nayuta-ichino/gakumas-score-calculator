package com.example.demo.dto;

import java.util.List;
import java.util.stream.Stream;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalcRequestDTO {

    //インナークラス サポートカード編成
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class supportCardInfomation {
        @Min(1)
        private int id; //カードID
        @Min(0)
        @Max(4)
        private int limitBreakCount; //凸数
    }
    
    //インナークラス スケジュール
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class scheduleInfomation{
        private Integer ClassDance;
        private Integer ClassVisual;
        private Integer ClassVocal;
        private Integer LessonDance;
        private Integer LessonVisual;
        private Integer LessonVocal;
        private Integer Consultation; //相談
        private Integer Gifts; //差し入れ
        private Integer GoingOut; //おでかけ
        private Integer SpecialInstruction; //特別指導
    }

    //インナークラス ユーザー入力欄
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class userInputInfomation{
        // スキルカード獲得時（500番台）
        private Integer mentalGet;
        private Integer activeGet;
        private Integer skillSSRGet;
        private Integer goodGet;
        private Integer focusGet;
        private Integer genkiGet;
        private Integer impressionGet;
        private Integer onzonGet;
        // 獲得時（600番台）
        private Integer pItemGet;
        private Integer pDrinkGet;
        // 強化時（700番台）
        private Integer skillUp;
        private Integer activeUp;
        private Integer mentalUp;
        // 削除時（800番台）
        private Integer skillDel;
        private Integer activeDel;
        private Integer mentalDel;
        // カスタム（1100番台）
        private Integer skillCustom;
        // チェンジ時（1200番台）
        private Integer skillChange;
        // 交換後（1300番台）
        private Integer pDrinkTradeAfter;
    }

    private supportCardInfomation slot1;
    private supportCardInfomation slot2;
    private supportCardInfomation slot3;
    private supportCardInfomation slot4;
    private supportCardInfomation slot5; 
    private supportCardInfomation slot6;

    //slot1～6の[id]をリスト化
    public List<Integer> getIdList(){
        return Stream.of(slot1,slot2,slot3,slot4,slot5,slot6)
            .map(slot -> slot != null ? slot.getId() : 0)
            .toList();
    }

    //slot1～6の[limitBreakCount]をリスト化
    public List<Integer> getLimitBreakCountList(){
        return Stream.of(slot1,slot2,slot3,slot4,slot5,slot6)
            .map(slot -> slot != null ? slot.getLimitBreakCount() : 0)
            .toList();
    }


}
