using DataBaseClass;
using Garments.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Garments.Controllers
{
	public class AjaxAPIController : ApiController
	{
		#region  Declarations
		private defaultModel objClass = new defaultModel();
		private DataTable dt = new DataTable();
		private DataSet ds = new DataSet();

		#endregion
		#region  methods
		[HttpPost]
		public string AddUpdateOrders(defaultModel Order)
		{
			int intOrderStatus = 0;
			string strStatus = "";
			if (Order != null)
			{
				objClass.intID = Order.intID;
				objClass.strFirstName = Order.strFirstName;
				objClass.strSecondName = Order.strSecondName;
				
				objClass.intIsActive = 1;
				objClass.intMode = Order.intMode;
				intOrderStatus = objClass.AddUpdateData();

				if (intOrderStatus == 1)
				{
					strStatus = "Data Added Successfully!";
				}
				if (intOrderStatus == 2)
				{
					strStatus = "Data Updated Successfully!";
				}
				if (intOrderStatus == 3)
				{
					strStatus = "Data Deleted Successfully!";
				}
			}
			return strStatus;
		}
		public DataTable GetDatas()
		{
			dt = objClass.GetDatas();
			return dt;
		}
		#endregion
		
	}
}
