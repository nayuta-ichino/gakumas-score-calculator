package com.example.demo.domain;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.example.demo.dto.CalcRequestDTO;
import com.example.demo.entity.CardScoreEntity;

import lombok.Getter;

@Getter
@Component
public class CardScore {
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
     * @param userImput ユーザーが入力した情報
     * @return totalScore 合計点数
     */
    public Integer calculationCardScore(Map<String, List<Double>> calcMap, CalcRequestDTO.scheduleInfomation schedule,
            CalcRequestDTO.userInputInfomation userImput) {
        Integer totalScore = 0;

        // 300_2 授業・営業を回数合算
        Integer totalClass = schedule.getClassVocal() + schedule.getClassDance() + schedule.getClassVisual();
        // 700_1 スキル強化 アクティブ強化とメンタル強化の回数を合算
        Integer totalSkillUp = userImput.getActiveUp() + userImput.getMentalUp();
        // 800_1 スキル削除 アクティブ削除とメンタル削除の回数を合算
        Integer totalSkillDel = userImput.getActiveDel() + userImput.getMentalDel();

        for (Map.Entry<String, List<Double>> entry : calcMap.entrySet()) {
            String k = entry.getKey();
            List<Double> v = entry.getValue();
            // 点数を合算(v → totalValue)
            Double totalValue = 0.0;
            for (Double double1 : v) {
                totalValue += double1;
            }

            if (k != null && !k.isEmpty() && !k.equals("0")) {
                String prefix = k.split("_")[0];
                String suffix = k.split("_")[1];

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
                        } else {
                            break;
                        }
                    case "900": // SP率（900番台）
                        if (suffix.equals("1") || suffix.equals("2")) {
                            // SP率, すべてのSP率
                            totalScore += (int) (totalValue * 100);
                        } else {
                            break;
                        }

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
                        } else {
                            break;
                        }

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
                        } else {
                            break;
                        }

                    case "400": // 開始時（400番台）
                        if (suffix.equals("1") && schedule.getSpecialInstruction() != 0) {
                            // 1 特別指導
                            totalScore += totalValue.intValue() * schedule.getSpecialInstruction();
                        } else {
                            break;
                        }

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
                        } else {
                            break;
                        }

                        /**
                         * userInputInfomation
                         */
                    case "500": // スキルカード獲得時（500番台）
                        if (suffix.equals("1") && userImput.getMentalGet() != 0) {
                            // 1 メンタル
                            totalScore += totalValue.intValue() * userImput.getMentalGet();
                        } else if (suffix.equals("2") && userImput.getActiveGet() != 0) {
                            // 2 アクティブ
                            totalScore += totalValue.intValue() * userImput.getActiveGet();
                        } else if (suffix.equals("3") && userImput.getSkillSSRGet() != 0) {
                            // 3 スキル（SSR）
                            totalScore += totalValue.intValue() * userImput.getSkillSSRGet();
                        } else if (suffix.equals("4") && userImput.getGoodGet() != 0) {
                            // 4 好調
                            totalScore += totalValue.intValue() * userImput.getGoodGet();
                        } else if (suffix.equals("5") && userImput.getFocusGet() != 0) {
                            // 5 集中
                            totalScore += totalValue.intValue() * userImput.getFocusGet();
                        } else if (suffix.equals("6") && userImput.getPowerGet() != 0) {
                            // 6 元気
                            totalScore += totalValue.intValue() * userImput.getPowerGet();
                        } else if (suffix.equals("7") && userImput.getImpressionGet() != 0) {
                            // 7 好印象
                            totalScore += totalValue.intValue() * userImput.getImpressionGet();
                        } else if (suffix.equals("8") && userImput.getCoolDownGet() != 0) {
                            // 8 温存
                            totalScore += totalValue.intValue() * userImput.getCoolDownGet();
                        } else {
                            break;
                        }

                    case "600": // 獲得時（600番台）
                        if (suffix.equals("1") && userImput.getPItemGet() != 0) {
                            // 1 Pアイテム
                            totalScore += totalValue.intValue() * userImput.getPItemGet();
                        } else if (suffix.equals("2") && userImput.getPDrinkGet() != 0) {
                            // 2 Pドリンク
                            totalScore += totalValue.intValue() * userImput.getPDrinkGet();
                        } else {
                            break;
                        }

                    case "700": // 強化時（700番台）
                        if (suffix.equals("1") && totalSkillUp != 0) {
                            // 1 スキル強化
                            totalScore += totalValue.intValue() * totalSkillUp;
                        } else if (suffix.equals("2") && userImput.getActiveUp() != 0) {
                            // 2 アクティブ強化
                            totalScore += totalValue.intValue() * userImput.getActiveUp();
                        } else if (suffix.equals("3") && userImput.getMentalUp() != 0) {
                            // 3 メンタル強化
                            totalScore += totalValue.intValue() * userImput.getMentalUp();
                        } else {
                            break;
                        }

                    case "800": // 削除時（800番台）
                        if (suffix.equals("1") && totalSkillDel != 0) {
                            // 1 スキル削除
                            totalScore += totalValue.intValue() * totalSkillDel;
                        } else if (suffix.equals("2") && userImput.getActiveDel() != 0) {
                            // 2 アクティブ削除
                            totalScore += totalValue.intValue() * userImput.getActiveDel();
                        } else if (suffix.equals("3") && userImput.getMentalDel() != 0) {
                            // 3 メンタル削除
                            totalScore += totalValue.intValue() * userImput.getMentalDel();
                        } else {
                            break;
                        }

                    case "1100": // カスタム時（1100番台）
                        if (suffix.equals("1") && userImput.getSkillCustom() != 0) {
                            // 1 スキルカスタム
                            totalScore += totalValue.intValue() * userImput.getSkillCustom();
                        } else {
                            break;
                        }

                    case "1200": // チェンジ時（1200番台）
                        if (suffix.equals("1") && userImput.getSkillChange() != 0) {
                            // 1 スキルチェンジ
                            totalScore += totalValue.intValue() * userImput.getSkillChange();
                        } else {
                            break;
                        }

                    case "1300": // 交換後（1300番台）
                        if (suffix.equals("1") && userImput.getPDrinkTradeAfter() != 0) {
                            // 1 相談Pドリンク交換
                            totalScore += totalValue.intValue() * userImput.getPDrinkTradeAfter();
                        } else {
                            break;
                        }

                    default:
                        break;
                }
            }
        }
        return totalScore;
    }
}
