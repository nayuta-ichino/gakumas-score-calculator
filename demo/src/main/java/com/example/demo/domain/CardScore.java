package com.example.demo.domain;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.example.demo.dto.CalcRequestDTO;
import com.example.demo.entity.CardScoreEntity;
import com.example.demo.service.CardsService;

import lombok.Getter;

@Getter
@Component
public class CardScore {
    private static final Logger log = LoggerFactory.getLogger(CardsService.class);
    /**
     * 凸数に応じてスコアを計算
     * スケジュールとユーザー入力欄については未対応
     * 
     * @param cardScoreEntity
     * @param cardLimitBreakCount
     * @return
     */
    public Integer calculationCardScore(CardScoreEntity cardScoreEntity, int cardLimitBreakCount) {
        int resultScore = cardScoreEntity.getScore() + (int) Math.round(
                (cardScoreEntity.getLimitScore() - cardScoreEntity.getScore()) / 4.0 * cardLimitBreakCount);

        return resultScore;
    }

    /**
     * 凸数に応じてスコアを計算
     * スケジュールとユーザー入力欄 一部対応完了
     * 
     * @param calcMap   計算用MAP（key:ability_id, value:value）
     * @param schedule  ユーザーが選択したスケジュール情報
     * @param userInput ユーザーが入力した情報
     * @return totalScore 合計点数
     */
    public Integer calculationCardScore(Map<String, List<Double>> calcMap, CalcRequestDTO.ScheduleInfomation schedule,
            CalcRequestDTO.UserInputInfomation userInput) {
        Integer totalScore = 0;

        // 300_2 授業・営業を回数合算
        Integer totalClass = schedule.getClassVocal() + schedule.getClassDance() + schedule.getClassVisual();
        // 700_1 スキル強化 アクティブ強化とメンタル強化の回数を合算
        Integer totalSkillUp = userInput.getActiveUp() + userInput.getMentalUp();
        // 800_1 スキル削除 アクティブ削除とメンタル削除の回数を合算
        Integer totalSkillDel = userInput.getActiveDel() + userInput.getMentalDel();

        log.info("授業・営業回数 →" + totalClass);
        log.info("スキル強化回数 →" + totalSkillUp);
        log.info("スキル削除回数 →" + totalSkillDel);

        for (Map.Entry<String, List<Double>> entry : calcMap.entrySet()) {
            log.info("【合計点数】　" + totalScore);
            
            String k = entry.getKey();
            List<Double> v = entry.getValue();
            // 点数を合算(v → totalValue)
            Double totalValue = 0.0;
            for (Double double1 : v) {
                totalValue += double1;
            }
            log.info("点数を合算 →" + totalValue);

            if (k != null && !k.isEmpty() && !k.equals("0")) {
                String prefix = k.split("_")[0];
                String suffix = k.split("_")[1];
                log.info("接頭 →" + prefix);
                log.info("末尾 →" + suffix);

                switch (prefix) {
                    /**
                     * 初期加算
                     */
                    case "100": // 初期（100番台）
                        if (suffix.equals("1")) {
                            // 初期値
                            totalScore += totalValue.intValue();
                        } else if (suffix.equals("2")) {
                            // パラメータボーナス
                            totalScore += (int) (totalValue * 1000);
                        } 
                        break;

                    case "900": // SP率（900番台）
                        if (suffix.equals("1") || suffix.equals("2")) {
                            // SP率, すべてのSP率
                            totalScore += (int) (totalValue * 100);
                        } 
                        break;


                        /**
                         * scheduleInfomation 計算
                         */
                    case "200": // レッスン終了時（200番台）
                        if (suffix.equals("4") && schedule.getLessonVocal() != 0) {
                            // 4 Voレッスン終了時
                            totalScore += totalValue.intValue() * schedule.getLessonVocal();
                        } else if (suffix.equals("5") && schedule.getLessonVocal() != 0) {
                            // 5 VoSP終了時
                            totalScore += totalValue.intValue() * schedule.getLessonVocal();
                        } else if (suffix.equals("7") && schedule.getLessonDance() != 0) {
                            // 7 Daレッスン終了時
                            totalScore += totalValue.intValue() * schedule.getLessonDance();
                        } else if (suffix.equals("8") && schedule.getLessonDance() != 0) {
                            // 8 DaSP終了時
                            totalScore += totalValue.intValue() * schedule.getLessonDance();
                        } else if (suffix.equals("10") && schedule.getLessonVisual() != 0) {
                            // 10 Viレッスン終了時
                            totalScore += totalValue.intValue() * schedule.getLessonVisual();
                        } else if (suffix.equals("11") && schedule.getLessonVisual() != 0) {
                            // 11 ViSP終了時
                            totalScore += totalValue.intValue() * schedule.getLessonVisual();
                        } 
                        break;

                    case "300": // 終了時（300番台）
                        if (suffix.equals("1") && schedule.getGoingOut() != 0) {
                            // 1 おでかけ
                            totalScore += totalValue.intValue() * schedule.getGoingOut();
                        } else if (suffix.equals("2") && totalClass != 0) {
                            // 2 授業・営業
                            totalScore += totalValue.intValue() * totalClass;
                        } else if (suffix.equals("3") && schedule.getAudition() != 0) {
                            // 3 試験・オーディション
                            totalScore += totalValue.intValue() * schedule.getAudition();
                        } 
                        break;

                    case "400": // 開始時（400番台）
                        if (suffix.equals("1") && schedule.getSpecialInstruction() != 0) {
                            // 1 特別指導
                            totalScore += totalValue.intValue() * schedule.getSpecialInstruction();
                        } 
                        break;

                    case "1000": // 選択時（1000番台）
                        if (suffix.equals("1") && schedule.getGifts() != 0) {
                            // 1 活動支給・差し入れ
                            totalScore += totalValue.intValue() * schedule.getGifts();
                        } else if (suffix.equals("2") && schedule.getRest() != 0) {
                            // 2 休む
                            totalScore += totalValue.intValue() * schedule.getRest();
                        } else if (suffix.equals("3") && schedule.getConsultation() != 0) {
                            // 3 相談
                            totalScore += totalValue.intValue() * schedule.getConsultation();
                        } 
                        break;

                        /**
                         * userInputInfomation
                         */
                    case "500": // スキルカード獲得時（500番台）
                        if (suffix.equals("1") && userInput.getMentalGet() != 0) {
                            // 1 メンタル
                            totalScore += totalValue.intValue() * userInput.getMentalGet();
                        } else if (suffix.equals("2") && userInput.getActiveGet() != 0) {
                            // 2 アクティブ
                            totalScore += totalValue.intValue() * userInput.getActiveGet();
                        } else if (suffix.equals("3") && userInput.getSkillSSRGet() != 0) {
                            // 3 スキル（SSR）
                            totalScore += totalValue.intValue() * userInput.getSkillSSRGet();
                        } else if (suffix.equals("4") && userInput.getGoodGet() != 0) {
                            // 4 好調
                            totalScore += totalValue.intValue() * userInput.getGoodGet();
                        } else if (suffix.equals("5") && userInput.getFocusGet() != 0) {
                            // 5 集中
                            totalScore += totalValue.intValue() * userInput.getFocusGet();
                        } else if (suffix.equals("6") && userInput.getPowerGet() != 0) {
                            // 6 元気
                            totalScore += totalValue.intValue() * userInput.getPowerGet();
                        } else if (suffix.equals("7") && userInput.getImpressionGet() != 0) {
                            // 7 好印象
                            totalScore += totalValue.intValue() * userInput.getImpressionGet();
                        } else if (suffix.equals("8") && userInput.getCoolDownGet() != 0) {
                            // 8 温存
                            totalScore += totalValue.intValue() * userInput.getCoolDownGet();
                        } 
                        break;

                    case "600": // 獲得時（600番台）
                        if (suffix.equals("1") && userInput.getProduceItemGet() != 0) {
                            // 1 Pアイテム
                            totalScore += totalValue.intValue() * userInput.getProduceItemGet();
                        } else if (suffix.equals("2") && userInput.getProduceDrinkGet() != 0) {
                            // 2 Pドリンク
                            totalScore += totalValue.intValue() * userInput.getProduceDrinkGet();
                        } 
                        break;

                    case "700": // 強化時（700番台）
                        if (suffix.equals("1") && totalSkillUp != 0) {
                            // 1 スキル強化
                            totalScore += totalValue.intValue() * totalSkillUp;
                        } else if (suffix.equals("2") && userInput.getActiveUp() != 0) {
                            // 2 アクティブ強化
                            totalScore += totalValue.intValue() * userInput.getActiveUp();
                        } else if (suffix.equals("3") && userInput.getMentalUp() != 0) {
                            // 3 メンタル強化
                            totalScore += totalValue.intValue() * userInput.getMentalUp();
                        } 
                        break;

                    case "800": // 削除時（800番台）
                        if (suffix.equals("1") && totalSkillDel != 0) {
                            // 1 スキル削除
                            totalScore += totalValue.intValue() * totalSkillDel;
                        } else if (suffix.equals("2") && userInput.getActiveDel() != 0) {
                            // 2 アクティブ削除
                            totalScore += totalValue.intValue() * userInput.getActiveDel();
                        } else if (suffix.equals("3") && userInput.getMentalDel() != 0) {
                            // 3 メンタル削除
                            totalScore += totalValue.intValue() * userInput.getMentalDel();
                        } 
                        break;

                    case "1100": // カスタム時（1100番台）
                        if (suffix.equals("1") && userInput.getSkillCustom() != 0) {
                            // 1 スキルカスタム
                            totalScore += totalValue.intValue() * userInput.getSkillCustom();
                        }
                        break;

                    case "1200": // チェンジ時（1200番台）
                        if (suffix.equals("1") && userInput.getSkillChange() != 0) {
                            // 1 スキルチェンジ
                            totalScore += totalValue.intValue() * userInput.getSkillChange();
                        } 
                        break;

                    case "1300": // 交換後（1300番台）
                        if (suffix.equals("1") && userInput.getProduceDrinkTradeAfter() != 0) {
                            // 1 相談Pドリンク交換
                            totalScore += totalValue.intValue() * userInput.getProduceDrinkTradeAfter();
                        } 
                        break;

                    default:
                        break;
                }
            }
        }
        
        log.info("return直後" + totalScore);
        return totalScore;
    }
}
