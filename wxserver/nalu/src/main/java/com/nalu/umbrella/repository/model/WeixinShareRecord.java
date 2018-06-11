package com.nalu.umbrella.repository.model;

import java.io.Serializable;
import java.util.Date;

public class WeixinShareRecord implements Serializable {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column weixin_share_record.ID
     *
     * @mbg.generated
     */
    private Long id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column weixin_share_record.OPEN_ID
     *
     * @mbg.generated
     */
    private String openId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column weixin_share_record.CITY_CODE
     *
     * @mbg.generated
     */
    private String cityCode;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column weixin_share_record.PICTURE_URL
     *
     * @mbg.generated
     */
    private String pictureUrl;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column weixin_share_record.QRCODE_URL
     *
     * @mbg.generated
     */
    private String qrcodeUrl;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column weixin_share_record.SHARE_COUNT
     *
     * @mbg.generated
     */
    private Long shareCount;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column weixin_share_record.ISDELETED
     *
     * @mbg.generated
     */
    private Integer isdeleted;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column weixin_share_record.CREATED_DATE
     *
     * @mbg.generated
     */
    private Date createdDate;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column weixin_share_record.UPDATE_DATE
     *
     * @mbg.generated
     */
    private Date updateDate;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table weixin_share_record
     *
     * @mbg.generated
     */
    private static final long serialVersionUID = 1L;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column weixin_share_record.ID
     *
     * @return the value of weixin_share_record.ID
     *
     * @mbg.generated
     */
    public Long getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column weixin_share_record.ID
     *
     * @param id the value for weixin_share_record.ID
     *
     * @mbg.generated
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column weixin_share_record.OPEN_ID
     *
     * @return the value of weixin_share_record.OPEN_ID
     *
     * @mbg.generated
     */
    public String getOpenId() {
        return openId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column weixin_share_record.OPEN_ID
     *
     * @param openId the value for weixin_share_record.OPEN_ID
     *
     * @mbg.generated
     */
    public void setOpenId(String openId) {
        this.openId = openId == null ? null : openId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column weixin_share_record.CITY_CODE
     *
     * @return the value of weixin_share_record.CITY_CODE
     *
     * @mbg.generated
     */
    public String getCityCode() {
        return cityCode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column weixin_share_record.CITY_CODE
     *
     * @param cityCode the value for weixin_share_record.CITY_CODE
     *
     * @mbg.generated
     */
    public void setCityCode(String cityCode) {
        this.cityCode = cityCode == null ? null : cityCode.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column weixin_share_record.PICTURE_URL
     *
     * @return the value of weixin_share_record.PICTURE_URL
     *
     * @mbg.generated
     */
    public String getPictureUrl() {
        return pictureUrl;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column weixin_share_record.PICTURE_URL
     *
     * @param pictureUrl the value for weixin_share_record.PICTURE_URL
     *
     * @mbg.generated
     */
    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl == null ? null : pictureUrl.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column weixin_share_record.QRCODE_URL
     *
     * @return the value of weixin_share_record.QRCODE_URL
     *
     * @mbg.generated
     */
    public String getQrcodeUrl() {
        return qrcodeUrl;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column weixin_share_record.QRCODE_URL
     *
     * @param qrcodeUrl the value for weixin_share_record.QRCODE_URL
     *
     * @mbg.generated
     */
    public void setQrcodeUrl(String qrcodeUrl) {
        this.qrcodeUrl = qrcodeUrl == null ? null : qrcodeUrl.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column weixin_share_record.SHARE_COUNT
     *
     * @return the value of weixin_share_record.SHARE_COUNT
     *
     * @mbg.generated
     */
    public Long getShareCount() {
        return shareCount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column weixin_share_record.SHARE_COUNT
     *
     * @param shareCount the value for weixin_share_record.SHARE_COUNT
     *
     * @mbg.generated
     */
    public void setShareCount(Long shareCount) {
        this.shareCount = shareCount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column weixin_share_record.ISDELETED
     *
     * @return the value of weixin_share_record.ISDELETED
     *
     * @mbg.generated
     */
    public Integer getIsdeleted() {
        return isdeleted;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column weixin_share_record.ISDELETED
     *
     * @param isdeleted the value for weixin_share_record.ISDELETED
     *
     * @mbg.generated
     */
    public void setIsdeleted(Integer isdeleted) {
        this.isdeleted = isdeleted;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column weixin_share_record.CREATED_DATE
     *
     * @return the value of weixin_share_record.CREATED_DATE
     *
     * @mbg.generated
     */
    public Date getCreatedDate() {
        return createdDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column weixin_share_record.CREATED_DATE
     *
     * @param createdDate the value for weixin_share_record.CREATED_DATE
     *
     * @mbg.generated
     */
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column weixin_share_record.UPDATE_DATE
     *
     * @return the value of weixin_share_record.UPDATE_DATE
     *
     * @mbg.generated
     */
    public Date getUpdateDate() {
        return updateDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column weixin_share_record.UPDATE_DATE
     *
     * @param updateDate the value for weixin_share_record.UPDATE_DATE
     *
     * @mbg.generated
     */
    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
}