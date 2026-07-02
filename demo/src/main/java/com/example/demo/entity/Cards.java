package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cards")
public class Cards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String image;

    @Column(name = "rarity_id", nullable = false)
    private Integer rarityId;

    @Column(name = "type_id", nullable = false)
    private Integer typeId;

    @Column(name = "plan_id", nullable = false)
    private Integer planId;

    @Column(name = "event_get_id", nullable = false)
    private Integer eventGetId;

    @Column(name = "event_1_id")
    private Integer event1Id;

    @Column(name = "event_2_id")
    private Integer event2Id;

    @Column(name = "limit_break", nullable = false)
    private Integer limitBreak;

    public Cards() {}

    public Cards(String name, String image, Integer rarityId, Integer typeId,
                 Integer planId, Integer eventGetId, Integer event1Id,
                 Integer event2Id, Integer limitBreak) {
        this.name = name;
        this.image = image;
        this.rarityId = rarityId;
        this.typeId = typeId;
        this.planId = planId;
        this.eventGetId = eventGetId;
        this.event1Id = event1Id;
        this.event2Id = event2Id;
        this.limitBreak = limitBreak;
    }

    // --- Getter ---
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getImage() { return image; }
    public Integer getRarityId() { return rarityId; }
    public Integer getTypeId() { return typeId; }
    public Integer getPlanId() { return planId; }
    public Integer getEventGetId() { return eventGetId; }
    public Integer getEvent1Id() { return event1Id; }
    public Integer getEvent2Id() { return event2Id; }
    public Integer getLimitBreak() { return limitBreak; }

    // --- Setter ---
    public void setName(String name) { this.name = name; }
    public void setImage(String image) { this.image = image; }
    public void setRarityId(Integer rarityId) { this.rarityId = rarityId; }
    public void setTypeId(Integer typeId) { this.typeId = typeId; }
    public void setPlanId(Integer planId) { this.planId = planId; }
    public void setEventGetId(Integer eventGetId) { this.eventGetId = eventGetId; }
    public void setEvent1Id(Integer event1Id) { this.event1Id = event1Id; }
    public void setEvent2Id(Integer event2Id) { this.event2Id = event2Id; }
    public void setLimitBreak(Integer limitBreak) { this.limitBreak = limitBreak; }
}

