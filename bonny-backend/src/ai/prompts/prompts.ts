export const QUERY_PROMPT = `
You are an SQL expert and only generate SQL Statements.
The Database you are querying from is a POSTGRES Database.
Note that the column names always have to be in quotation marks.
Note that there are ENUMs that are only allowing the given ENUMs in the column.
The schema us are querying from is called "public" 
Always use the schema in your queries.
Beneath you are seeing the database table schema of the database in the CSV format from which you should extract data from.


"table_name","column_name","data_type"
affiliate,id,integer
affiliate,title,character varying
affiliate,description,character varying
affiliate,externalUrl,character varying
affiliate,imageUrl,character varying
affiliate,createdBy,character varying
affiliate,updatedBy,character varying
affiliate,createdOn,timestamp without time zone
affiliate,updatedOn,timestamp without time zone
affiliate_status,id,integer
affiliate_status,status,enum('done')
affiliate_status,purchaseDate,timestamp without time zone
affiliate_status,affiliateId,integer
affiliate_status,profileId,character varying
affiliate_status,createdBy,character varying
affiliate_status,updatedBy,character varying
affiliate_status,createdOn,timestamp without time zone
affiliate_status,updatedOn,timestamp without time zone
answer,id,integer
answer,freeText,text
answer,questionId,integer
answer,selectedOptionId,integer
answer,profileId,character varying
answer,createdBy,character varying
answer,updatedBy,character varying
answer,createdOn,timestamp without time zone
answer,updatedOn,timestamp without time zone
coupon,id,integer
coupon,title,character varying
coupon,description,character varying
coupon,details,character varying
coupon,expiryDate,timestamp without time zone
coupon,type,character varying
coupon,imageUrl,character varying
coupon,multiplier,integer
coupon,createdBy,character varying
coupon,updatedBy,character varying
coupon,createdOn,timestamp without time zone
coupon,updatedOn,timestamp without time zone
coupon_status,id,integer
coupon_status,status, enum('redeemed', 'active')
coupon_status,redeemDate,timestamp without time zone
coupon_status,couponId,integer
coupon_status,profileId,character varying
coupon_status,createdBy,character varying
coupon_status,updatedBy,character varying
coupon_status,createdOn,timestamp without time zone
coupon_status,updatedOn,timestamp without time zone
migrations,id,integer
migrations,timestamp,bigint
migrations,name,character varying
profile,email,character varying
profile,phoneNr,character varying
profile,tokens,double precision
profile,id,character varying
profile,pda,character varying
profile,userName,character varying
profile,createdBy,character varying
profile,updatedBy,character varying
profile,createdOn,timestamp without time zone
profile,updatedOn,timestamp without time zone
profile,supporterStatus,character varying
quest,id,integer
quest,title,character varying
quest,description,character varying
quest,type,character varying
quest,imageUrl,character varying
quest,surveyId,integer
quest,reclaimId,integer
quest,points,double precision
quest,externalUrl,character varying
quest,enabled,boolean
quest,createdBy,character varying
quest,updatedBy,character varying
quest,createdOn,timestamp without time zone
quest,updatedOn,timestamp without time zone
quest_status,id,integer
quest_status,status,ENUM('done', 'active')
quest_status,completedDate,timestamp without time zone
quest_status,questId,integer
quest_status,profileId,character varying
quest_status,transactionId,integer
quest_status,createdBy,character varying
quest_status,updatedBy,character varying
quest_status,createdOn,timestamp without time zone
quest_status,updatedOn,timestamp without time zone
question,id,integer
question,title,character varying
question,type,character varying
question,order,integer
question,surveyId,integer
question,createdBy,character varying
question,updatedBy,character varying
question,createdOn,timestamp without time zone
question,updatedOn,timestamp without time zone
question_option,id,integer
question_option,title,character varying
question_option,order,integer
question_option,questionId,integer
question_option,createdBy,character varying
question_option,updatedBy,character varying
question_option,createdOn,timestamp without time zone
question_option,updatedOn,timestamp without time zone
receipt,id,integer
receipt,storageUrl,character varying
receipt,supplierName,character varying
receipt,receiptDate,timestamp without time zone
receipt,hash,character varying
receipt,transactionsId,integer
receipt,totalAmount,double precision
receipt,createdBy,character varying
receipt,updatedBy,character varying
receipt,createdOn,timestamp without time zone
receipt,updatedOn,timestamp without time zone
reclaim,id,integer
reclaim,createdBy,character varying
reclaim,updatedBy,character varying
reclaim,createdOn,timestamp without time zone
reclaim,updatedOn,timestamp without time zone
reclaim_status,id,integer
reclaim_status,profileId,character varying
reclaim_status,reclaimId,integer
reclaim_status,createdBy,character varying
reclaim_status,updatedBy,character varying
reclaim_status,createdOn,timestamp without time zone
reclaim_status,updatedOn,timestamp without time zone
referral,refereeProfileId,character varying
referral,referrerProfileId,character varying
special_offer,id,integer
special_offer,title,character varying
special_offer,description,character varying
special_offer,imageUrl,character varying
stats,id,integer
stats,totalReceipts,integer
stats,totalQuests,integer
stats,totalCoupons,integer
stats,totalUsers,integer
stats,totalEarend,double precision
stats,createdBy,character varying
stats,updatedBy,character varying
stats,createdOn,timestamp without time zone
stats,updatedOn,timestamp without time zone
survey,id,integer
survey,title,character varying
survey,description,character varying
survey,points,integer
survey,createdBy,character varying
survey,updatedBy,character varying
survey,createdOn,timestamp without time zone
survey,updatedOn,timestamp without time zone
transaction,id,integer
transaction,blockchainTxId,character varying
transaction,profileId,character varying
transaction,type,character varying
transaction,status, enum('receipt_upload', 'quest', 'coupon')
transaction,tokens,double precision
transaction,timestamp,timestamp without time zone
transaction,createdBy,character varying
transaction,updatedBy,character varying
transaction,createdOn,timestamp without time zone
transaction,updatedOn,timestamp without time zone
typeorm_metadata,type,character varying
typeorm_metadata,database,character varying
typeorm_metadata,schema,character varying
typeorm_metadata,table,character varying
typeorm_metadata,name,character varying
typeorm_metadata,value,text


Generate an SQL Statement that fetches the right data from the database based on this statement:

`


export const TEST_PROMPT = `
Analyze the following image to determine if it contains a structurally complete receipt. A structurally complete receipt typically includes the following elements:

    Merchant Information: The name and address of the store or business.
    Transaction Details: Date and time of the transaction.
    Items Purchased: A list of items with their respective prices.
    Total Amount: The total cost of the purchase, including taxes.
    Payment Information: Details about the payment method (cash, credit card, etc.).
    Receipt Number: A unique identifier for the transaction.

Based on these criteria, please confirm whether the image contains a structurally complete receipt and highlight the presence or absence of each of the required elements.

Give me an answer as a json like this:

valid: boolean (Your decision on whether it is real or not. The answer has to be a boolean without quoation marks. Either true or false)
reason: string (A short one sentence answer on why you think it is real or not)
image_type: string (Is the uploaded image a real photo from a camera of a physical receipt or is the image a screenshot OR is the image a banking transaction with no real products on it)
products_tracked: number (Count how many items that the consumer bought. Items are products that are typical all printed on the receipt to show which items he bought. Count how many items there are on the receipt)
trust_score: number (Score from 0 to 10 on how trustworthy this receipt is. Really think about of if this could be a fake receipt).
quality_score: number (Score on how well the receipt photo is taken. Really think about of how good the details are visible and readable)
status: "valid" | "bad_quality" | "no_receipt" (
"valid" if if your decision is true.
"bad_quality" if valid is false because the quality of the photo image to not good enough to read everything.
"no_receipt" if valid is false because the photo doesn't represent a receipt.
)
transaction_timestamp: string (The date and time of the transaction. Set the time to 00:00:00, if there's only a date. Format: YYYY-MM-DDThh:mm:ss)

`;