SET QUOTED_IDENTIFIER ON 
GO
SET ANSI_NULLS ON 
GO

if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[FindUserByName]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].FindUserByName
GO

CREATE PROCEDURE [dbo].FindUserByName(
	@Name  nvarchar(40)
)
AS
BEGIN
SELECT 
	[User_ID] as UserId 
	FROM [Users] 
	WHERE  [Name] = @Name
END

GO
SET QUOTED_IDENTIFIER OFF 
GO
SET ANSI_NULLS ON 
GO
