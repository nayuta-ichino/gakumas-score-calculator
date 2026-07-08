package com.example.demo.dto;

import com.example.demo.entity.CardsEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardsResponseDto {
    private Long id;
    private String name;
    private String image;
    private String rarityName; //rarity_masterから取得
    private String typeName; //type_masterから取得
    private String planName; //plan_masterから取得
    private String eventGetName; //EventGetMasterから取得
    private String eventName1; //EventMasterから取得
    private String eventName2; //EventMasterから取得


    public static CardsResponseDto fromEntity(CardsEntity cardsEntity){
        CardsResponseDto cardsResponseDto = new CardsResponseDto();
        cardsResponseDto.setId(cardsEntity.getId());
        cardsResponseDto.setName(cardsEntity.getName());
        cardsResponseDto.setImage(cardsEntity.getImage());
        cardsResponseDto.setRarityName(cardsEntity.getRarityMaster().getRarity());
        cardsResponseDto.setTypeName(cardsEntity.getTypeMaster().getType());
        cardsResponseDto.setPlanName(cardsEntity.getPlanMaster().getPlan());
        cardsResponseDto.setEventGetName(cardsEntity.getEventGetMaster().getEventGet());
        cardsResponseDto.setEventName1(cardsEntity.getEventMaster1().getEvent());
        cardsResponseDto.setEventName2(cardsEntity.getEventMaster2().getEvent());

        return cardsResponseDto;
    }
}
