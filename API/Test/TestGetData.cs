using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using API.Controllers;
using API.Models;
using System.IO;
using System.Data;
namespace Test
{
	[TestClass]
	public class TestGetData
	{
		[TestMethod]
		public void GetDatas_ShouldReturnAllDatas()
		{
			
			DataTable dt = new DataTable();
			var controller = new API.Controllers.AjaxAPIController();
			 dt = controller.GetDatas() as DataTable;
			Assert.AreEqual(10, dt.Rows.Count);
		}

	}
}
