package com.example.demo.dto;

import java.util.List;

import com.example.demo.entity.Cards;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FormationResponseDTO {
    private List<Cards> slotList;
}
