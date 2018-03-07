using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DataBaseClass
{
    public class RepositoryBase
    {
        #region
        protected Connection objConnection;
        /// <summary>
        /// 
        /// </summary>
        public RepositoryBase()
        {
            objConnection = new Connection();
        }
        #endregion
    }
}
