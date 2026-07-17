package com.example.demo.projection;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SQLResultInfomationProjection {
    private int id; // カードID
    private String name; // カード名称
    private String abilityId; // アビリティID
    private int limitBreak; // 凸数
    private double value; // 上昇値
}
