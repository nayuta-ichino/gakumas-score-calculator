package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalcResponseDTO {
    private int totalScore;

    private Integer scoreSlot1;
    private Integer scoreSlot2;
    private Integer scoreSlot3;
    private Integer scoreSlot4;
    private Integer scoreSlot5;
    private Integer scoreSlot6;

    
}
