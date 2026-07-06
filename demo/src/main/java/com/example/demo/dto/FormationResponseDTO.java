package com.example.demo.dto;

import java.util.List;

import com.example.demo.entity.CardsEntity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FormationResponseDTO {
    private List<CardsEntity> slotList;
}
