/*
{
    "target": "https://web[0-9]\\.ib\\.mizuhobank\\.co\\.jp|test_mizuhobank_co_jp\\.html",
    "account_name": "mizuhobank_co_jp",
    "custom": false,
    "date_format": "YYYY.MM.DD",
    "column_date": 0,
    "column_name": 3,
    "column_memo": null,
    "column_deposit": 2,
    "column_withdraw": 1,
    "amount_separator": "[^-0-9]",
    "test": {
        "rows": [
            ["日付", "お引出金額", "お預入金額", "お取引内容"],
            ["2015.04.11", "5,000 円", "-", "ＡＴＭ（０００）"],
            ["2015.05.15", "-", "2,000,000 円", "振込"]
        ],
        "trans": [
            {"date": "2015-04-11", "name": "ＡＴＭ（０００）", "memo": "", "amount": -5000},
            {"date": "2015-05-15", "name": "振込", "memo": "", "amount": 2000000}
        ]
    }
}
*/
