using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebSite.Models;

namespace WebSite.Controllers
{
    public class PracticeController : Controller
    {
        // GET: Practice
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult SavePhoto(PracticeModel model)
        {
            try
            {
                
                HttpPostedFileBase fb = null;
                for(int i = 0; i < Request.Files.Count; i++)
                {
                    fb = Request.Files[i];
                }
                return Json(new { Message = new PracticeModel().SavePhoto(model, fb) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new {ex.Message},JsonRequestBehavior.AllowGet);
            }
        }
       

        public ActionResult GetPracticeList()
        {
            try
            {
                return Json(new { model = (new PracticeModel().GetPracticeList()) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeletePractice(int Id)
        {
            try
            {
                return Json(new { model = (new PracticeModel().DeletePractice(Id)) },JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new {ex.Message}, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult EditPractice(int Id)
        {
            try
            {
                return Json(new { model = (new PracticeModel().EditPractice(Id)) }, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        
        public ActionResult PracticeDetail(int Id)
        {
            ViewBag.Id = Id;
            return View(); 
        }



    }
}