using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace DataBaseClass
{
    public class Global
    {
        public static Int32 intLoginUserID
        {
            get { return HttpContext.Current == null || HttpContext.Current.Session["intLoginUserID"] == null ? 0 : Convert.ToInt32(HttpContext.Current.Session["intLoginUserID"]); }
            set
            {
                if (HttpContext.Current != null)
                {
                    HttpContext.Current.Session["intLoginUserID"] = value;
                }
            }
        }
        public static Int32 intLoginUserGroupID
        {
            get { return HttpContext.Current == null || HttpContext.Current.Session["intLoginUserGroupID"] == null ? 0 : Convert.ToInt32(HttpContext.Current.Session["intLoginUserGroupID"]); }
            set
            {
                if (HttpContext.Current != null)
                {
                    HttpContext.Current.Session["intLoginUserGroupID"] = value;
                }
            }
        }
        public static Int32 intAdminID
        {
            get { return HttpContext.Current == null || HttpContext.Current.Session["intAdminID"] == null ? 0 : Convert.ToInt32(HttpContext.Current.Session["intAdminID"]); }
            set
            {
                if (HttpContext.Current != null)
                {
                    HttpContext.Current.Session["intAdminID"] = value;
                }
            }
        }
        public static Int32 intLoginID
        {
            get { return HttpContext.Current == null || HttpContext.Current.Session["intLoginID"] == null ? 0 : Convert.ToInt32(HttpContext.Current.Session["intLoginID"]); }
            set
            {
                if (HttpContext.Current != null)
                {
                    HttpContext.Current.Session["intLoginID"] = value;
                }
            }
        }
        public static String strLoginUserName
        {
            get { return (HttpContext.Current == null || HttpContext.Current.Session["strLoginUserName"] == null) ? String.Empty : Convert.ToString(HttpContext.Current.Session["strLoginUserName"]); }
            //Updated on 12-Jan-2012
            set { if (HttpContext.Current != null) HttpContext.Current.Session["strLoginUserName"] = value; }
        }
        public static String strLoginName
        {
            get { return (HttpContext.Current == null || HttpContext.Current.Session["strLoginName"] == null) ? String.Empty : Convert.ToString(HttpContext.Current.Session["strLoginName"]); }
            //Updated on 12-Jan-2012
            set { if (HttpContext.Current != null) HttpContext.Current.Session["strLoginName"] = value; }
        }
        public static String strGroupName
        {
            get { return (HttpContext.Current == null || HttpContext.Current.Session["strGroupName"] == null) ? String.Empty : Convert.ToString(HttpContext.Current.Session["strGroupName"]); }
            //Updated on 12-Jan-2012
            set { if (HttpContext.Current != null) HttpContext.Current.Session["strGroupName"] = value; }
        }
        public static String strLoginUserFirstName
        {
            get { return HttpContext.Current == null || HttpContext.Current.Session["strLoginUserFirstName"] == null ? String.Empty : Convert.ToString(HttpContext.Current.Session["strLoginUserFirstName"]); }
            set { HttpContext.Current.Session["strLoginUserFirstName"] = value; }
        }
        public static String strLoginUserLastName
        {
            get { return HttpContext.Current == null || HttpContext.Current.Session["strLoginUserLastName"] == null ? String.Empty : Convert.ToString(HttpContext.Current.Session["strLoginUserLastName"]); }
            set { HttpContext.Current.Session["strLoginUserLastName"] = value; }
        }
        public static String strLoginUserImage
        {
            get { return HttpContext.Current == null || HttpContext.Current.Session["strLoginUserImage"] == null ? String.Empty : Convert.ToString(HttpContext.Current.Session["strLoginUserImage"]); }
            set { HttpContext.Current.Session["strLoginUserImage"] = value; }
        }
        public static String strLoginEmailID
        {
            get { return HttpContext.Current == null || HttpContext.Current.Session["strLoginEmailID"] == null ? String.Empty : Convert.ToString(HttpContext.Current.Session["strLoginEmailID"]); }
            set { HttpContext.Current.Session["strLoginEmailID"] = value; }
        }
        public static String strLastLoginTimestamp
        {
            get { return HttpContext.Current == null || HttpContext.Current.Session["strLastLoginTimestamp"] == null ? String.Empty : Convert.ToString(HttpContext.Current.Session["strLastLoginTimestamp"]); }
            set { HttpContext.Current.Session["strLastLoginTimestamp"] = value; }
        }
        public static Int32 LoginLogId
        {
            get { return HttpContext.Current == null || HttpContext.Current.Session["intLoginLogId"] == null ? 0 : Convert.ToInt32(HttpContext.Current.Session["intLoginLogId"]); }
            set
            {
                if (HttpContext.Current != null)
                {
                    HttpContext.Current.Session["intLoginLogId"] = value;
                }
            }
        }
        public static String strLoginIP
        {
            get { return (HttpContext.Current == null || HttpContext.Current.Session["strLoginIP"] == null) ? String.Empty : Convert.ToString(HttpContext.Current.Session["strLoginIP"]); }
            set { if (HttpContext.Current != null) HttpContext.Current.Session["strLoginIP"] = value; }
        }
        public static String strUserBrowser
        {
            get { return (HttpContext.Current == null || HttpContext.Current.Session["strUserBrowser"] == null) ? String.Empty : Convert.ToString(HttpContext.Current.Session["strUserBrowser"]); }
            set { if (HttpContext.Current != null) HttpContext.Current.Session["strUserBrowser"] = value; }
        }
        public static Int32 intRoleID
        {
            get { return HttpContext.Current == null || HttpContext.Current.Session["intRoleID"] == null ? 0 : Convert.ToInt32(HttpContext.Current.Session["intRoleID"]); }
            set
            {
                if (HttpContext.Current != null)
                {
                    HttpContext.Current.Session["intRoleID"] = value;
                }
            }
        }
    }
}
