using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Configuration;
using System.Collections;
using DataBaseClass;
using System.Data;
using System.Data.SqlClient;

namespace DataBaseClass
{
    public class ExceptionHandling : RepositoryBase
    {
        DBConfiguration dbcon = new DBConfiguration();

        #region Variables
        public int ExceptionId { get; set; }
        public string PageName { get; set; }
        public string UserAgent { get; set; }
        public string ClientIP { get; set; }
        public string ClientLoginName { get; set; }
        public string ExceptionDate { get; set; }
        public DataTable dtException { get; set; }
        public int TotalExceptions { get; set; }
        public int StartIndex { get; set; }
        public int PageSize { get; set; }
        public string ExceptionIds { get; set; }
        public string ClassName { get; set; }
        public string MethodName { get; set; }
        // Added by Manmeet
        public String ExceptionText { get; set; }
        public String CustomMessage { get; set; }
        public int EmployeeID { get; set; }
        #endregion
        #region Methods
        public ExceptionHandling InsertException(ExceptionHandling objExceptionHandling)
        {
            try
            {
                SqlParameter[] objParam = new SqlParameter[9];
                objParam[0] = new SqlParameter("@PageName", objExceptionHandling.PageName);
                objParam[1] = new SqlParameter("@ClassName", objExceptionHandling.ClassName);
                objParam[2] = new SqlParameter("@MethodName", objExceptionHandling.MethodName);
                objParam[3] = new SqlParameter("@ExceptionMessage", objExceptionHandling.ExceptionText);
                objParam[4] = new SqlParameter("@CustomMessage", objExceptionHandling.CustomMessage);
                objParam[5] = new SqlParameter("@UserAgent", objExceptionHandling.UserAgent);
                objParam[6] = new SqlParameter("@ClientIP", objExceptionHandling.ClientIP);
                objParam[7] = new SqlParameter("@ClientLoginName", objExceptionHandling.ClientLoginName);
                objParam[8] = new SqlParameter("@EmployeeID", objExceptionHandling.EmployeeID);
                SqlHelper.ExecuteDataset(objConnection.GetConnection(), CommandType.StoredProcedure, "InsertException", objParam);
            }
            catch (Exception ex)
            {
                ExceptionHandling.CatchAndLogError(ex, "Error while trying to InsertException(ExceptionHandling objExceptionHandling)", "CatchAndLogError(Exception ex, String sMessage, String sPageName, String sUserName, String sClassName, String sMethodName).cs", Global.strLoginName, "CatchAndLogError(Exception ex, String sMessage, String sPageName, String sUserName, String sClassName, String sMethodName).cs", "InsertException(ExceptionHandling objExceptionHandling)");
            }
            return objExceptionHandling;
        }
        public static void CatchAndLogError(Exception ex, String sMessage, String sPageName, String sUserName, String sClassName, String sMethodName)
        {
            try
            {
                ExceptionHandling objException = new ExceptionHandling();
                objException.PageName = sPageName;
                objException.ExceptionText = ex.Message;
                objException.CustomMessage = sMessage;
                objException.PageName = sPageName;
                objException.ClientLoginName = sUserName;
                objException.ClientIP = Global.strLoginIP;
                objException.UserAgent = Global.strUserBrowser;
                objException.EmployeeID = Global.intLoginID;
                objException.ClassName = sClassName;
                objException.MethodName = sMethodName;
                (new ExceptionHandling()).InsertException(objException);
            }
            catch (Exception exx)
            {
                ExceptionHandling.CatchAndLogError(exx, "Error while trying to CatchAndLogError(Exception ex, String sMessage, String sPageName, String sUserName, String sClassName, String sMethodName)", "CatchAndLogError(Exception ex, String sMessage, String sPageName, String sUserName, String sClassName, String sMethodName).cs", Global.strLoginName, "CatchAndLogError(Exception ex, String sMessage, String sPageName, String sUserName, String sClassName, String sMethodName).cs", "CatchAndLogError(Exception ex, String sMessage, String sPageName, String sUserName, String sClassName, String sMethodName)");

            }
        }
         //public string  InsertException(Exception ex, string sMessage, string sPageName, string sUserName, string sClassName, string sMethodName)
         //{
         //    string EN = "";
         //    DataSet ds = new DataSet();
         //    try
         //    {
         //        ds = dbcon.Execute_Query(" select EnquiryNo  ", "EnquiryMaster");
               
         //    }
         //    catch (Exception ex)
         //    {
         //        throw ex;
         //    }
         //    return EN;
         //}
        #endregion
    }
}
