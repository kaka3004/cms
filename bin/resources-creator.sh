gulp create:resource --name=product --attributes=title:String,slug:String,body_html:String,description:String,gender:String,images:[ImageSchema],tags:[String],variants_options:[VariantsOptionsSchema],variants:[VariantsSchema],merchant_id:TODO,category_id:TODO,publish_status:String,published_at:Date

gulp create:resource --name=category --attributes=title:String,slug:String,status:String,description:String,cover_image:[imageSchema],main_image:[imageSchema]

gulp create:resource --name=cart --attributes=items:[cartItemSchema],totals:totalsSchema,total_items:Number,total_unique_items:Number,shop_id:TODO,user_id:TODO

gulp create:resource --name=user --attributes=display_name:String,username:String,images:[userImageSchema],shipping_address:[addressSchema],online_at:Date

gulp create:resource --name=shop --attributes=name:String,published:Boolean,config:TODO,creator_id:TODO
