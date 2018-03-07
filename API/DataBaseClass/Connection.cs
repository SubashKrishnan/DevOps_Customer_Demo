using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace DataBaseClass
{
	public class Connection
	{
		#region Connection String
		/// <summary>
		///
		/// </summary>
		/// <returns></returns>
		public string GetConnection()
		{
			string strConnectionString = null;
			try
			{
				strConnectionString = ConfigurationManager.ConnectionStrings["SQL"].ConnectionString; //"Data Source=ASPIRE1548;Initial Catalog=ROOMEXPENSEMANAGER;User ID=sa;Password=aspire@123";
				//ConfigurationManager.ConnectionStrings["REM"].ToString();//
				//strConnectionString= WebConfigurationManager.ConnectionStrings["SQL"].ConnectionString;                                                                                                              //SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["MYConnector"].ToString());
			}
			finally
			{
				//Will Implement Later
			}
			return strConnectionString;
		}
		#endregion
	}
}
