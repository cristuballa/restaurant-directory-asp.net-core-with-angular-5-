
create PROCEDURE [dbo].[GetRestaurants]
(
	 @keyword nvarchar(100)
)
AS 
BEGIN
	if @keyword='' begin
		Select * from Restaurants where IsVerified =1 order by Name
	 end
	else begin
		Select * from Restaurants where  IsVerified =1 and description + Name + address + AverageCost + ContactInfo + Cuisine + OpenHours+OtherInfo+TypeOfRestaurant   like '%'+@keyword+'%'
	end
  
END
go 


create PROCEDURE [dbo].[GetRestaurantsUnVerified]
AS 
BEGIN

		Select * from Restaurants where IsVerified=0

END
go 


create PROCEDURE [dbo].[GetRestaurantsVerified]
AS 
BEGIN

		Select * from Restaurants where IsVerified=1

END
