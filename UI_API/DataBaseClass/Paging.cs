using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseClass
{
    public class Paging
    {
        #region Public Methods
        public string doPaging(int intCurrentPageNumber, int intPageSize, int intTotalRecords)
        {
            // Step 1 Calculate the total number of pages
            int totalNumberOfPages = 0;
            StringBuilder strPaginHtml = new StringBuilder();
            if (intTotalRecords % intPageSize != 0)
            {
                totalNumberOfPages = intTotalRecords / intPageSize;
                totalNumberOfPages += 1;
            }
            else
            {
                totalNumberOfPages = intTotalRecords / intPageSize;
            }
            // Case 1
            // There should be five or less then or single page.
            //First Page or Grid Renderred First Time
            //Check for total pages because paging has to be rendered or not.
            if (System.Web.HttpContext.Current.Request.Form["requestParameter"] == null)
            {
                if (totalNumberOfPages > 1 && totalNumberOfPages <= 5)
                {
                    //Render HTML of first request.
                    RenderFirstAndPreviosForPaging(ref strPaginHtml, intCurrentPageNumber);
                    RenderPagingBox(ref strPaginHtml, intCurrentPageNumber, totalNumberOfPages);
                    RenderNextAndLastForPaging(ref strPaginHtml, intCurrentPageNumber == totalNumberOfPages ? intCurrentPageNumber : intCurrentPageNumber + 1, intCurrentPageNumber, totalNumberOfPages);
                }
                if (totalNumberOfPages > 5)
                {
                    RenderFirstAndPreviosForPaging(ref strPaginHtml, intCurrentPageNumber);
                    RenderPagingBox(ref strPaginHtml, intCurrentPageNumber, totalNumberOfPages);
                    RenderNextAndLastForPaging(ref strPaginHtml, intCurrentPageNumber == totalNumberOfPages ? intCurrentPageNumber : intCurrentPageNumber + 1, intCurrentPageNumber, totalNumberOfPages);
                }
                else if (totalNumberOfPages == 1)
                {
                    // no paging has to be returend
                    return null;
                }
            }
            else if (System.Web.HttpContext.Current.Request.Form["requestParameter"] != null)
            {
                if (totalNumberOfPages > 1 && totalNumberOfPages <= 5)
                {
                    //Render HTML of first request.
                    RenderFirstAndPreviosForPaging(ref strPaginHtml, intCurrentPageNumber);
                    RenderPagingBox(ref strPaginHtml, intCurrentPageNumber, totalNumberOfPages);
                    RenderNextAndLastForPaging(ref strPaginHtml, intCurrentPageNumber == totalNumberOfPages ? intCurrentPageNumber : intCurrentPageNumber + 1, intCurrentPageNumber, totalNumberOfPages);
                }
                if (totalNumberOfPages > 5)
                {
                    RenderFirstAndPreviosForPaging(ref strPaginHtml, intCurrentPageNumber);
                    System.Web.HttpContext.Current.Session["StartPage"] = intCurrentPageNumber;
                    //Added Today
                    if (intCurrentPageNumber + 4 >= totalNumberOfPages)
                    {
                        System.Web.HttpContext.Current.Session["EndPage"] = totalNumberOfPages;
                    }
                    else
                    {
                        System.Web.HttpContext.Current.Session["EndPage"] = intCurrentPageNumber + 4 != totalNumberOfPages ? intCurrentPageNumber + 4 : intCurrentPageNumber;
                    }
                    RenderPagingBox(ref strPaginHtml, intCurrentPageNumber, totalNumberOfPages);
                    RenderNextAndLastForPaging(ref strPaginHtml, intCurrentPageNumber == totalNumberOfPages ? intCurrentPageNumber : intCurrentPageNumber + 1, intCurrentPageNumber, totalNumberOfPages);
                }
                else if (totalNumberOfPages == 1)
                {
                    // no paging has to be returend
                    return null;
                }
            }
            return strPaginHtml.ToString();
        }
        #endregion
        #region Private Methods
        private StringBuilder RenderFirstAndPreviosForPaging(ref StringBuilder strPaging, int intPageNumber)
        {
            int pageNumber = intPageNumber;
            intPageNumber = intPageNumber - 1 == 0 ? intPageNumber : intPageNumber - 1;
            strPaging.Append("<div id='pager'><div class='page-go-con'> <div class='page-go-but'>");
            strPaging.Append("<button onclick='getGridRecordByPageNumber()' class='button' title='Go' type='button'><span><span>Go</span></span></button></div><label for='go' style='padding-right:5px;'>Go to Page</label><input name='go' runat='server' enableviewstate='true' clientidmode='Static' maxlength='5' onkeypress='return CheckEnterKey(event,this);' type='text' id='goPage' class='reg-input3-2' /> </div>");
            strPaging.Append(" <ul>");
            if (pageNumber == 1)
            {
                strPaging.Append(" <li><a href=\"javascript:void(0)" + "\" title='First' class='first' style='background-position: 0 -38px; cursor : default;'>&nbsp;</a></li>");
                strPaging.Append("<li><a href= \"javascript:void(0)" + "\" title='Previous' class='prev' style='background-position: 0 -38px; cursor : default;'>&nbsp;</a></li>");
            }
            else
            {
                strPaging.Append(" <li><a href=\"javascript:GetPage(1)" + "\" title='First' class='first'>&nbsp;</a></li>");
                strPaging.Append("<li><a href= \"javascript:GetPage(" + intPageNumber + ")" + "\" title='Previous' class='prev'>&nbsp;</a></li>");
            }
            return strPaging;
        }
        private StringBuilder RenderPagingBox(ref StringBuilder strPaging, int intStartPage, int intEndPage)
        {
            //When Start page is equal to end page
            //First Time Load
            if (intStartPage == 1)
            {
                if (intEndPage <= 5)
                {
                    for (int i = intStartPage; i <= intEndPage; i++)
                    {
                        strPaging.Append("<li>");
                        if (i == 1)
                        {
                            if (intStartPage == i)
                            {
                                strPaging.Append("<a class='pagerclass active' id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                            }
                            else
                            {
                                strPaging.Append("<a class='pagerclass' id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                            }
                        }
                        else
                        {
                            strPaging.Append("<a id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                        }
                        strPaging.Append(" </li>");
                    }
                    //added today
                    System.Web.HttpContext.Current.Session["EndPage"] = intEndPage;
                }
                else if (intStartPage == 1 && intEndPage > 5)
                {
                    int i = 0;
                    for (i = intStartPage; i <= 5; i++)
                    {
                        strPaging.Append(" <li>");
                        if (i == 1)
                        {
                            if (intStartPage == i)
                            {
                                strPaging.Append("<a class='pagerclass active' id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                            }
                            else
                            {
                                strPaging.Append("<a class='pagerclass' id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                            }
                        }
                        else
                        {
                            strPaging.Append("<a id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                        }
                        strPaging.Append(" </li>");
                    }
                    System.Web.HttpContext.Current.Session["EndPage"] = i - 1;
                }
                System.Web.HttpContext.Current.Session["StartPage"] = intStartPage.ToString();
            }
            else if (intStartPage == intEndPage)
            {
                System.Web.HttpContext.Current.Session["EndPage"] = intEndPage;
                //ADDEDD TODAY (27 April 2011)
                //System.Web.HttpContext.Current.Session["StartPage"] = intEndPage - 4;
                if (intEndPage > 5)
                {
                    System.Web.HttpContext.Current.Session["StartPage"] = intEndPage - 4;
                }
                else
                {
                    System.Web.HttpContext.Current.Session["StartPage"] = 1;
                }
                for (int i = Convert.ToInt32(System.Web.HttpContext.Current.Session["StartPage"] != null ? System.Web.HttpContext.Current.Session["StartPage"] : 0); i <= intStartPage; i++)
                {
                    strPaging.Append(" <li>");
                    if (i == intStartPage)
                    {
                        strPaging.Append("<a class='pagerclass active' id='" + i + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                    }
                    else
                    {
                        strPaging.Append("<a id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                    }
                    strPaging.Append(" </li>");
                }
            }
            else if (intStartPage <= Convert.ToInt32(System.Web.HttpContext.Current.Session["StartPage"] == null ? "1" : System.Web.HttpContext.Current.Session["StartPage"]) && intStartPage >= Convert.ToInt32(System.Web.HttpContext.Current.Session["EndPage"] == null ? "1" : System.Web.HttpContext.Current.Session["EndPage"]))
            {
                if (intEndPage <= 5)
                {
                    for (int i = intStartPage; i <= intEndPage; i++)
                    {
                        strPaging.Append("<li>");
                        if (i == 1)
                        {
                            if (intStartPage == i)
                            {
                                strPaging.Append("<a class='pagerclass active' id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                            }
                            else
                            {
                                strPaging.Append("<a class='pagerclass' id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                            }
                        }
                        else
                        {
                            strPaging.Append("<a id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                        }
                        strPaging.Append(" </li>");
                    }
                }
                else if (intStartPage == 1 && intEndPage > 5)
                {
                    int i = 0;
                    for (i = intStartPage; i <= 5; i++)
                    {
                        strPaging.Append(" <li>");
                        if (i == 1)
                        {
                            if (i == intStartPage)
                            {
                                strPaging.Append("<a class='pagerclass active' id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                            }
                            else
                            {
                                strPaging.Append("<a class='pagerclass' id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                            }
                        }
                        else
                        {
                            strPaging.Append("<a id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                        }
                        strPaging.Append(" </li>");
                    }
                    System.Web.HttpContext.Current.Session["EndPage"] = i - 1;
                }
                System.Web.HttpContext.Current.Session["StartPage"] = intStartPage.ToString();
            }
            //For Next Next
            else if (intStartPage > Convert.ToInt32(System.Web.HttpContext.Current.Session["EndPage"] == null ? "1" : System.Web.HttpContext.Current.Session["EndPage"]) && intStartPage != intEndPage)
            {
                //int diff =  Convert.ToInt32(System.Web.HttpContext.Current.Session["EndPage"] != null  ? System.Web.HttpContext.Current.Session["EndPage"] : 0) -  Convert.ToInt32(System.Web.HttpContext.Current.Session["StartPage"] != null  ?System.Web.HttpContext.Current.Session["StartPage"] : 0) +1;
                System.Web.HttpContext.Current.Session["StartPage"] = Convert.ToInt32(System.Web.HttpContext.Current.Session["StartPage"] != null ? System.Web.HttpContext.Current.Session["StartPage"] : 0) + 1;
                int i = 0;
                int myLoadLinks = 0;
                if (intStartPage == 2 || intStartPage == 3 || intStartPage == 4)
                {
                    myLoadLinks = 5;
                }
                else
                {
                    myLoadLinks = intStartPage;
                }
                for (i = Convert.ToInt32(System.Web.HttpContext.Current.Session["StartPage"] != null ? System.Web.HttpContext.Current.Session["StartPage"] : 0); i <= myLoadLinks; i++)
                {
                    strPaging.Append(" <li>");
                    if (i == intStartPage)
                    {
                        strPaging.Append("<a style='color:#fff; background-color:#114FD4; border:1px solid #114FD4; text-decoration:none;' id='" + i + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                    }
                    else
                    {
                        strPaging.Append("<a id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                    }
                    strPaging.Append(" </li>");
                }
                System.Web.HttpContext.Current.Session["EndPage"] = i - 1;
            }
            //Previous Previous
            else if (intStartPage < Convert.ToInt32(System.Web.HttpContext.Current.Session["StartPage"] == null ? "1" : System.Web.HttpContext.Current.Session["StartPage"]) && intStartPage != intEndPage)
            {
                System.Web.HttpContext.Current.Session["StartPage"] = Convert.ToInt32(System.Web.HttpContext.Current.Session["StartPage"] != null ? System.Web.HttpContext.Current.Session["StartPage"] : 0) - 1;
                System.Web.HttpContext.Current.Session["EndPage"] = Convert.ToInt32(System.Web.HttpContext.Current.Session["EndPage"] != null ? System.Web.HttpContext.Current.Session["EndPage"] : 0) - 1;
                for (int i = Convert.ToInt32(System.Web.HttpContext.Current.Session["StartPage"] != null ? System.Web.HttpContext.Current.Session["StartPage"] : 0); i <= Convert.ToInt32(System.Web.HttpContext.Current.Session["EndPage"] == null ? "1" : System.Web.HttpContext.Current.Session["EndPage"]); i++)
                {
                    strPaging.Append(" <li>");
                    if (i == intStartPage)
                    {
                        strPaging.Append("<a class='pagerclass active' id='" + i + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                    }
                    else
                    {
                        strPaging.Append("<a id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                    }
                    strPaging.Append(" </li>");
                }
            }
            //Onclick of Paging Box
            else
            {
                //adeed today
                if (Convert.ToInt32((System.Web.HttpContext.Current.Session["EndPage"] == null ? "1" : System.Web.HttpContext.Current.Session["EndPage"])) - Convert.ToInt32(System.Web.HttpContext.Current.Session["StartPage"] == null ? "1" : System.Web.HttpContext.Current.Session["StartPage"]) < 5 &&
                                               Convert.ToInt32(System.Web.HttpContext.Current.Session["EndPage"]) == intEndPage && intEndPage > 5)
                {
                    System.Web.HttpContext.Current.Session["StartPage"] = Convert.ToInt32(System.Web.HttpContext.Current.Session["StartPage"]) - (5 - (Convert.ToInt32(System.Web.HttpContext.Current.Session["EndPage"]) - (Convert.ToInt32(System.Web.HttpContext.Current.Session["StartPage"]) - 1)));
                }
                for (int i = Convert.ToInt32(System.Web.HttpContext.Current.Session["StartPage"] == null ? "1" : System.Web.HttpContext.Current.Session["StartPage"]); i <= Convert.ToInt32(System.Web.HttpContext.Current.Session["EndPage"] == null ? "1" : System.Web.HttpContext.Current.Session["EndPage"]); i++)
                {
                    strPaging.Append(" <li>");
                    if (i == intStartPage)
                    {
                        strPaging.Append("<a class='pagerclass active' id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                    }
                    else
                    {
                        strPaging.Append("<a id='" + intStartPage + "'  href=\"javascript:GetPage(" + i + ")" + "\">" + i + "</a>  ");
                    }
                    strPaging.Append(" </li>");
                }
            }
            return strPaging;
        }
        private StringBuilder RenderNextAndLastForPaging(ref StringBuilder strPaging, int intNextPagenumber, int intPageNumber, int intLastPageNumber)
        {
            if (intPageNumber == intLastPageNumber)
            {
                strPaging.Append("<li><a  href=\"javascript:void(0)" + "\"title='Next' class='next' style='background-position: 0 -38px; cursor : default;'>&nbsp;</a></li>");
                strPaging.Append("<li><a id='aLastPage' pagenumber='" + intLastPageNumber + "' href=\"javascript:void(0)" + "\" title='Last' class='last' style='background-position: 0 -38px; cursor : default;'>&nbsp;</a></li>");
            }
            else
            {
                strPaging.Append("<li><a  href=\"javascript:GetPage(" + intNextPagenumber + ")" + "\"title='Next' class='next'>&nbsp;</a></li>");
                strPaging.Append("<li><a id='aLastPage' pagenumber='" + intLastPageNumber + "' href=\"javascript:GetPage(" + intLastPageNumber + ")" + "\" title='Last' class='last'>&nbsp;</a></li>");
            }
            strPaging.Append("</ul></div>");
            return strPaging;
        }
        #endregion
    }
}
