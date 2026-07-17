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
        private Integer classDance;
        private Integer classVisual;
        private Integer classVocal;
        private Integer lessonDance;
        private Integer lessonVisual;
        private Integer lessonVocal;
        private Integer consultation; //相談
        private Integer gifts; //差し入れ
        private Integer goingOut; //おでかけ
        private Integer specialInstruction; //特別指導
        private Integer audition; // 試験・オーディション
        private Integer rest; // 休む
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
        private Integer powerGet;
        private Integer impressionGet;
        private Integer coolDownGet;
        // 獲得時（600番台）
        private Integer pItemGet;
        private Integer pDrinkGet;
        // 強化時（700番台）
        //private Integer skillUp; activeUp + mentalUp でOK
        private Integer activeUp;
        private Integer mentalUp;
        // 削除時（800番台）
        //private Integer skillDel; activeDel + mentalDel でOK
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

    // 呼び出し用
    private scheduleInfomation schedule;
    private userInputInfomation userInput;
}
