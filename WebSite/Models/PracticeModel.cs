using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations.Sql;
using System.IO;
using System.Linq;
using System.Web;

namespace WebSite.Models
{
    public class PracticeModel
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string Phone { get; set; }
        public string Photo { get; set; }



        public string SavePhoto(PracticeModel model, HttpPostedFileBase fb)
        {
            string Message = "Photo Details Data Save Successfully";
            practiceEntities db = new practiceEntities();
            string filePath = "";
            string fileName = "";
            string sysFileName = "";

            if (fb != null && fb.ContentLength > 0)
            {

                filePath = HttpContext.Current.Server.MapPath("../Content/Img/");
                DirectoryInfo di = new DirectoryInfo(filePath);
                if (!di.Exists)
                {
                    di.Create();
                }
                fileName = fb.FileName;
                sysFileName = DateTime.Now.ToFileTime().ToString() + Path.GetExtension(fb.FileName);

                fb.SaveAs(filePath + "//" + sysFileName);
                if (!string.IsNullOrWhiteSpace(fb.FileName))
                {
                    string afileName = HttpContext.Current.Server.MapPath("../Content/Img/") + "/" + sysFileName;
                }

            }
            if (model.Id==0)
            {
                var savePhoto = new tbl_practice()
                {
                    Id = model.Id,
                    name = model.name,
                    Phone = model.Phone,
                    Photo = sysFileName
                };
                db.tbl_practice.Add(savePhoto);
                db.SaveChanges();
            }
            else
            {
                var savePhoto=db.tbl_practice.Where(p=>p.Id==model.Id).FirstOrDefault();
                if (savePhoto != null)
                {
                    savePhoto.Id=model.Id;
                    savePhoto.name=model.name;
                    savePhoto.Phone=model.Phone;
                    savePhoto.Photo=sysFileName;
                }
                db.SaveChanges();
                Message = "Update Business Data Successfully.";
            }
            return Message;
        }
        
        public List<PracticeModel> GetPracticeList()
        {
            practiceEntities db = new practiceEntities();
            List<PracticeModel> lstPractice = new List<PracticeModel>();

            var PracticeList = db.tbl_practice.ToList();

            if (PracticeList != null)
            {
                foreach (var tbl_ in PracticeList)
                {
                    lstPractice.Add(new PracticeModel()
                    {
                       Id= tbl_.Id, 
                       name=tbl_.name,
                       Phone= tbl_.Phone,
                       Photo = tbl_.Photo,
                        
                    });
                }

            }
            return lstPractice;
        }

        public string DeletePractice(int Id)
        {
            string Message = "Practice Data delete successfully.";
            practiceEntities db = new practiceEntities();
            var PracticeData = db.tbl_practice.Where(p => p.Id == Id).FirstOrDefault();
            if(PracticeData != null)
            {
                db.tbl_practice.Remove(PracticeData);
                db.SaveChanges();
            }
            return Message;
        }

        public PracticeModel EditPractice(int Id)
        {
            PracticeModel model = new PracticeModel();

            practiceEntities db = new practiceEntities();

            var editData=db.tbl_practice.Where(p=>p.Id==Id).FirstOrDefault();
            if (editData != null)
            {
                model.Id = editData.Id;
                model.name = editData.name;
                model.Phone = editData.Phone;
                model.Photo = editData.Photo;

            };
            return model;
        }

    }
}