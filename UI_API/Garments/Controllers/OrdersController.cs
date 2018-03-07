using DataBaseClass;
using Garments.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Controllers
{
	public class OrdersController : Controller
	{
		#region  Declarations
		private defaultModel objClass = new defaultModel();
		private DataTable dt = new DataTable();
		private DataSet ds = new DataSet();
		#endregion
		// GET: Home
		#region Action Results
		public ActionResult OrderEntry()
		{
			
			return View();
		}
		
		#endregion
	}
}