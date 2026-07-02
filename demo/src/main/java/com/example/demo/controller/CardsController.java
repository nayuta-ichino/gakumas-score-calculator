package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
public class CardsController {
    
    //JSON表示API
    @GetMapping("/api/cards")
    public List<Map<String, Object>> getCards(){
        Map<String, Object> card1 = Map.of(
            "id", "1",
            "name", "SSR ボーカルサポート",
            "rarity", "SSR",
            "type", "Vocal",
            "baseScore", 100,
            "scorePerLimitBreak", 4
        );
        Map<String, Object> card2 = Map.of(
            "id", "2",
            "name", "SR ビジュアルサポート",
            "rarity", "SR",
            "type", "Visual",
            "baseScore", 50,
            "scorePerLimitBreak", 2
        );

        List<Map<String, Object>> list = List.of(card1,card2);
        return list;
    }
}