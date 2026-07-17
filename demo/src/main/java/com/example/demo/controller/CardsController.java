package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CalcRequestDTO;
import com.example.demo.dto.CalcResponseDTO;
import com.example.demo.dto.CardsResponseDto;
import com.example.demo.dto.FormationRequestDTO;
import com.example.demo.dto.FormationResponseDTO;
import com.example.demo.entity.CardsEntity;
import com.example.demo.service.CardsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CardsController {
    private final CardsService cardsService;

    // コンストラクタ
    public CardsController(CardsService cardsService) {
        this.cardsService = cardsService;
    }

    // 全件取得API
    @GetMapping("/api/cards")
    public List<CardsEntity> getCards() {
        return cardsService.findAll();
    }

    // サポートカード編成API
    @PostMapping("/api/formation")
    public FormationResponseDTO getFormation(@RequestBody FormationRequestDTO requestDto) {
        return cardsService.getFormation(requestDto);
    }

    // 全件取得API(rarity_master,type_master,plan_master,event_get_master,event_master連携)
    @GetMapping("/api/cards/detail")
    public List<CardsResponseDto> getCardsDetail() {
        return cardsService.findAllDetail();
    }

    // サポートカード点数計算API
    @PostMapping("/api/calculation/totalscore")
    public CalcResponseDTO getFormationTotalScore(@RequestBody CalcRequestDTO calcRequestDTO){
        return cardsService.getFormationTotalScore(calcRequestDTO);
    }
}