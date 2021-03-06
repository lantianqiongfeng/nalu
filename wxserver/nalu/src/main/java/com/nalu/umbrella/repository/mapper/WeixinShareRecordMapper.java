package com.nalu.umbrella.repository.mapper;

import com.nalu.umbrella.repository.model.WeixinShareRecord;
import com.nalu.umbrella.repository.model.WeixinShareRecordExample;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WeixinShareRecordMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table weixin_share_record
     *
     * @mbg.generated
     */
    long countByExample(WeixinShareRecordExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table weixin_share_record
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table weixin_share_record
     *
     * @mbg.generated
     */
    int insert(WeixinShareRecord record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table weixin_share_record
     *
     * @mbg.generated
     */
    int insertSelective(WeixinShareRecord record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table weixin_share_record
     *
     * @mbg.generated
     */
    List<WeixinShareRecord> selectByExample(WeixinShareRecordExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table weixin_share_record
     *
     * @mbg.generated
     */
    WeixinShareRecord selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table weixin_share_record
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(WeixinShareRecord record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table weixin_share_record
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(WeixinShareRecord record);


    long countTotal();

    int updateRecord(WeixinShareRecord record);
}