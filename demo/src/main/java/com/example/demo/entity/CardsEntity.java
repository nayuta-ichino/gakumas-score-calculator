package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cards")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CardsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String image;

    // @Column(name = "rarity_id", nullable = false)
    // private Integer rarityId;

    // @Column(name = "type_id", nullable = false)
    // private Integer typeId;

    // @Column(name = "plan_id", nullable = false)
    // private Integer planId;

    // @Column(name = "event_get_id", nullable = false)
    // private Integer eventGetId;

    @Column(name = "event_1_id")
    private Integer event1Id;

    @Column(name = "event_2_id")
    private Integer event2Id;

    @ManyToOne
    @JoinColumn(name = "rarity_id")
    private RarityMaster rarityMaster;
    
    @ManyToOne
    @JoinColumn(name = "type_id")
    private TypeMaster typeMaster;
    
    @ManyToOne
    @JoinColumn(name = "plan_id")
    private PlanMaster planMaster;

    @ManyToOne
    @JoinColumn(name = "event_get_id")
    private EventGetMaster eventGetMaster;

    @ManyToOne
    @JoinColumn(name = "event_1_id", insertable = false, updatable = false)
    private EventMaster eventMaster1;

    @ManyToOne
    @JoinColumn(name = "event_2_id", insertable = false, updatable = false)
    private EventMaster eventMaster2;
}

