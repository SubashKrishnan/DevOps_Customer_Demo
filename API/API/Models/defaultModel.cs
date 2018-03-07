using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using DataBaseClass;
using System.Data;
using System.Data.SqlClient;

namespace Garments.Models
{
	public class defaultModel : RepositoryBase
	{
		DBConfiguration dbcon = new DBConfiguration();
		#region Variables
		//Order
		public int intID { get; set; }
		public string strFirstName { get; set; }
		public string strSecondName { get; set; }


		//Status
		public int intMode { get; set; }

		public int intIsActive { get; set; }

		DataTable dt = new DataTable();
		#endregion
		#region Methods

		public int AddUpdateData()
		{
			int intStatus = 0;
			try
			{
				SqlParameter[] objSqlParameter = new SqlParameter[20];
				objSqlParameter[0] = new SqlParameter("@intID", intID);
				objSqlParameter[1] = new SqlParameter("@strFirstName", strFirstName);
				objSqlParameter[2] = new SqlParameter("@strSecondName", strSecondName);
				objSqlParameter[3] = new SqlParameter("@intIsActive", intIsActive);
				objSqlParameter[4] = new SqlParameter("@intStatus", intStatus);
				objSqlParameter[4].Direction = ParameterDirection.Output;
				objSqlParameter[5] = new SqlParameter("@intMode", intMode);
				SqlHelper.ExecuteNonQuery(objConnection.GetConnection(), CommandType.StoredProcedure, "SP_AddUpdateData", objSqlParameter);
				intStatus = Convert.ToInt32(objSqlParameter[4].Value);
			}
			catch (Exception ex)
			{
				throw ex;

			}
			return intStatus;
		}

		public DataTable GetDatas()
		{
			try
			{

				dt = dbcon.Execute_Query("Select ID,FIRST_NAME, SECOND_NAME,ISACTIVE from Datas order by ID", "Datas").Tables[0];
			}
			catch (Exception ex)
			{
				throw ex;

			}
			return dt;
		}

		#endregion
	}
}