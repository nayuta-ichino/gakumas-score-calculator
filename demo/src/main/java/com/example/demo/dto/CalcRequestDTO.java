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

    //インナークラス
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
