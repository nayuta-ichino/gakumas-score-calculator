package com.example.demo.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Repository
public class CardsJdbcRepository{
    @Autowired
	private NamedParameterJdbcTemplate template;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SQLResultInfomation {
        private int id; //カードID
        private String name; //カード名称
        private String abilityId; //アビリティID
        private int limitBreak; //凸数
        private double value; //上昇値
    }
    
	/**
	 * SQLResultInfomationオブジェクトを生成するローマッパー.
	 */
    private static final RowMapper<SQLResultInfomation> SQL_RESULT_INFOMAION_ROW_MAPPER = (rs, i) -> {
        SQLResultInfomation sqlResultInfomation = new SQLResultInfomation();
        sqlResultInfomation.setId(rs.getInt("id"));
        sqlResultInfomation.setName(rs.getString("name"));
        sqlResultInfomation.setAbilityId(rs.getString("ability_id"));
        sqlResultInfomation.setLimitBreak(rs.getInt("limit_break"));
        sqlResultInfomation.setValue(rs.getDouble("value"));

        return sqlResultInfomation;
    };


    /**
     * @param idList
     * @return サポートカードID,サポートカード名称（Cards）
     *         凸数,上昇点数（limit_break_master）
     */
    public List<SQLResultInfomation> cardsValueInfomation(List<Integer> idList){
        String sql ="""
                        with selectCards as(
                        	select * from cards where id in(:idList)
                        )
                        
                        select 
                        	sub.*,
                            l.limit_break,
                            l.value
                        from
                        	(
                        		select s.id, s.name, s.ability_1_id as ability_id from selectCards s 
                                UNION ALL select s.id, s.name, s.ability_2_id as ability_id from selectCards s
                                UNION ALL select s.id, s.name, s.ability_3_id as ability_id from selectCards s
                                UNION ALL select s.id, s.name, s.ability_4_id as ability_id from selectCards s
                                UNION ALL select s.id, s.name, s.ability_5_id as ability_id from selectCards s
                                UNION ALL select s.id, s.name, s.ability_6_id as ability_id from selectCards s
                        	)sub
                        inner join
                        	limit_break_master l
                        on
                        	l.ability_id = sub.ability_id
                        order by
                        	sub.id,
                        	sub.ability_id
                        ;
                    """;

        SqlParameterSource param = new MapSqlParameterSource().addValue("idList", idList);

        return template.query(sql, param, SQL_RESULT_INFOMAION_ROW_MAPPER);
    }
    
}
