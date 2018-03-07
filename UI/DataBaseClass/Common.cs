using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace DataBaseClass
{
    public class Common
    {
        #region Private Variables
        private static String uploadPath = string.Empty;
        private static String downloadPath = string.Empty;
        private static String ftpPath = string.Empty;
        private static String networkUser = string.Empty;
        private static String networkPassword = string.Empty;
        #endregion
        #region Public Properties
        public static Int32 nLimit1 = 25;
        public static Int32 nLimit2 = 40;
        public static Int32 nLimit3 = 120;
        public static Int32 nLimit4 = 32;
        public static Int32 nLimit5 = 12;
        public static String UploadPath
        {
            get { return uploadPath; }
            set { uploadPath = ConfigurationManager.AppSettings["ImageUploadPath"]; }
        }
        public static String DownloadPath
        {
            get { return downloadPath; }
            set { downloadPath = ConfigurationManager.AppSettings["ImageDownLoadPath"]; }
        }
        public static String FTPPath
        {
            get { return ftpPath; }
            set { ftpPath = ConfigurationManager.AppSettings["FTPPath"]; }
        }
        public static String NetworkUser
        {
            get { return networkUser; }
            set { networkUser = ConfigurationManager.AppSettings["NetworkUser"]; }
        }
        public static String NetworkPassword
        {
            get { return networkPassword; }
            set { networkPassword = ConfigurationManager.AppSettings["NetworkPassword"]; }
        }
        public static String GetApplicationPath
        {
            get { return "http://" + HttpContext.Current.Request.Url.Authority + HttpContext.Current.Request.ApplicationPath.TrimEnd('/'); }
        }
        public static String RemoveHTMLTags(String sText)
        {
            return (Regex.Replace(sText, @"<[^>]*>", String.Empty)).Trim();
            ;
        }
        public static String GetImageName(string userName)
        {
            return userName + DateTime.Now.Ticks.ToString();
        }
        public static String GetRandomName()
        {
            return Guid.NewGuid().ToString().Substring(0, 8);
        }
        public static String ApplyGridStringLimit(String sText, Int32 nLimit)
        {
            if (sText != "")
                return sText.Substring(0, nLimit - 3) + "...";
            else
                return sText;
        }
        public static String SterilizeQueryString(String sText)
        {
            sText = sText.Replace("'", "''");
            sText = sText.Replace("\"\"", "");
            sText = sText.Replace(")", "");
            sText = sText.Replace("(", "");
            sText = sText.Replace(";", "");
            sText = sText.Replace("-", "");
            sText = sText.Replace("|", "");
            return sText;
        }
        public static String SerializeEncodedHTML(String sText)
        {
            return sText.Replace("\\", "/");
        }
        #endregion
        #region DateFormat
        public static int GetIntFormat(object value)
        {
            try
            {
                if (value.ToString() != "")
                {
                    char[] anyOf = new char[] { '/', ':', ' ', '-', '\\', ',' };
                    char[] Period = new char[] { '.' };
                    if (value.ToString().Trim().IndexOfAny(Period) > 0)
                    {
                        value = value.ToString().Replace(".", "");
                    }
                    if (value.ToString().Trim().IndexOfAny(anyOf) > 0)
                    {
                        //value = DateTime.Parse(value.ToString()).ToString("yyyyMMdd");
                        DateTime _EndDateTime = DateTime.ParseExact(value.ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture);
                        value = _EndDateTime.ToString("yyyyMMdd");
                    }
                }
                else
                {
                    value = "0";
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Convert.ToInt32(value.ToString());
        }
        #endregion
        #region Error Log Management
        public static String sUserIP { get; set; }
        public static String sUserAgent { get; set; }
        public static String SampleUrl { get; set; }
        #endregion
    }
}
