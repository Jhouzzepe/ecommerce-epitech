PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "django_migrations" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "app" varchar(255) NOT NULL, "name" varchar(255) NOT NULL, "applied" datetime NOT NULL);
INSERT INTO django_migrations VALUES(1,'contenttypes','0001_initial','2024-07-30 13:40:19.186601');
INSERT INTO django_migrations VALUES(2,'auth','0001_initial','2024-07-30 13:40:19.212552');
INSERT INTO django_migrations VALUES(3,'admin','0001_initial','2024-07-30 13:40:19.229180');
INSERT INTO django_migrations VALUES(4,'admin','0002_logentry_remove_auto_add','2024-07-30 13:40:19.239942');
INSERT INTO django_migrations VALUES(5,'admin','0003_logentry_add_action_flag_choices','2024-07-30 13:40:19.253062');
INSERT INTO django_migrations VALUES(6,'contenttypes','0002_remove_content_type_name','2024-07-30 13:40:19.271250');
INSERT INTO django_migrations VALUES(7,'auth','0002_alter_permission_name_max_length','2024-07-30 13:40:19.282528');
INSERT INTO django_migrations VALUES(8,'auth','0003_alter_user_email_max_length','2024-07-30 13:40:19.295297');
INSERT INTO django_migrations VALUES(9,'auth','0004_alter_user_username_opts','2024-07-30 13:40:19.305298');
INSERT INTO django_migrations VALUES(10,'auth','0005_alter_user_last_login_null','2024-07-30 13:40:19.315676');
INSERT INTO django_migrations VALUES(11,'auth','0006_require_contenttypes_0002','2024-07-30 13:40:19.320063');
INSERT INTO django_migrations VALUES(12,'auth','0007_alter_validators_add_error_messages','2024-07-30 13:40:19.333854');
INSERT INTO django_migrations VALUES(13,'auth','0008_alter_user_username_max_length','2024-07-30 13:40:19.348790');
INSERT INTO django_migrations VALUES(14,'auth','0009_alter_user_last_name_max_length','2024-07-30 13:40:19.360448');
INSERT INTO django_migrations VALUES(15,'auth','0010_alter_group_name_max_length','2024-07-30 13:40:19.371374');
INSERT INTO django_migrations VALUES(16,'auth','0011_update_proxy_permissions','2024-07-30 13:40:19.380124');
INSERT INTO django_migrations VALUES(17,'auth','0012_alter_user_first_name_max_length','2024-07-30 13:40:19.391121');
INSERT INTO django_migrations VALUES(18,'products','0001_initial','2024-07-30 13:40:19.443301');
INSERT INTO django_migrations VALUES(19,'products','0002_auto_20240730_1316','2024-07-30 13:40:19.465207');
INSERT INTO django_migrations VALUES(20,'products','0003_alter_product_image','2024-07-30 13:40:19.485070');
INSERT INTO django_migrations VALUES(21,'products','0004_alter_product_sizes','2024-07-30 13:40:19.502589');
INSERT INTO django_migrations VALUES(22,'products','0005_alter_product_sizes','2024-07-30 13:40:19.515717');
INSERT INTO django_migrations VALUES(23,'products','0006_alter_product_stock','2024-07-30 13:40:19.530485');
INSERT INTO django_migrations VALUES(24,'products','0007_auto_20240730_1338','2024-07-30 13:40:19.574028');
INSERT INTO django_migrations VALUES(25,'sessions','0001_initial','2024-07-30 13:40:19.586160');
INSERT INTO django_migrations VALUES(26,'products','0002_remove_product_sizes','2024-07-30 13:54:50.076309');
INSERT INTO django_migrations VALUES(27,'products','0002_product_created_at_product_image_product_updated_at','2024-07-31 13:07:05.531869');
INSERT INTO django_migrations VALUES(28,'products','0003_merge_20240731_0755','2024-07-31 13:07:05.535885');
INSERT INTO django_migrations VALUES(29,'products','0004_auto_20240731_0806','2024-07-31 13:07:05.579675');
INSERT INTO django_migrations VALUES(30,'products','0005_alter_product_updated_at_alter_review_product','2024-07-31 13:07:05.599052');
INSERT INTO django_migrations VALUES(31,'products','0005_order_customer_email_order_customer_name_and_more','2024-07-31 15:24:07.633426');
INSERT INTO django_migrations VALUES(32,'products','0006_auto_20240801_0844','2024-08-01 15:06:10.854235');
INSERT INTO django_migrations VALUES(33,'products','0007_alter_product_id','2024-08-01 15:06:10.871449');
INSERT INTO django_migrations VALUES(34,'products','0008_auto_20240801_0908','2024-08-01 15:06:10.886620');
INSERT INTO django_migrations VALUES(35,'products','0009_userprofile','2024-08-11 20:40:14.521555');
INSERT INTO django_migrations VALUES(36,'products','0010_userprofile_country','2024-08-11 20:40:14.536725');
INSERT INTO django_migrations VALUES(37,'products','0011_auto_20240805_1226','2024-08-11 20:40:14.560207');
INSERT INTO django_migrations VALUES(38,'products','0012_product_weight','2024-08-11 20:40:14.569784');
INSERT INTO django_migrations VALUES(39,'products','0013_auto_20240805_1314','2024-08-11 20:40:14.590653');
INSERT INTO django_migrations VALUES(40,'products','0009_prestataire','2024-08-11 20:40:14.595623');
INSERT INTO django_migrations VALUES(41,'products','0010_alter_prestataire_ean','2024-08-11 20:40:14.605004');
INSERT INTO django_migrations VALUES(42,'products','0014_merge_20240811_2040','2024-08-11 20:40:14.609655');
INSERT INTO django_migrations VALUES(43,'products','0014_merge_20240808_0947','2024-08-11 21:20:52.183968');
INSERT INTO django_migrations VALUES(44,'products','0015_auto_20240808_1248','2024-08-11 21:20:52.208543');
INSERT INTO django_migrations VALUES(45,'products','0015_alter_userprofile_country_alter_userprofile_user','2024-08-11 21:20:52.232105');
INSERT INTO django_migrations VALUES(46,'products','0014_merge_20240808_0937','2024-08-11 21:20:52.236315');
INSERT INTO django_migrations VALUES(47,'products','0016_merge_20240809_1356','2024-08-11 21:20:52.241004');
INSERT INTO django_migrations VALUES(48,'products','0015_shippinginfo_card_number_shippinginfo_cvv_and_more','2024-08-11 21:20:52.349129');
INSERT INTO django_migrations VALUES(49,'products','0017_merge_20240811_2120','2024-08-11 21:20:52.354638');
INSERT INTO django_migrations VALUES(50,'products','0017_merge_20240811_2133','2024-08-11 21:44:14.273406');
INSERT INTO django_migrations VALUES(51,'products','0017_merge_20240820_1341','2024-08-20 13:41:54.282657');
INSERT INTO django_migrations VALUES(52,'products','0017_merge_20240821_1247','2024-08-22 08:31:38.739295');
INSERT INTO django_migrations VALUES(53,'products','0018_merge_20240822_0807','2024-08-22 08:31:38.788687');
INSERT INTO django_migrations VALUES(54,'products','0017_merge_20240821_0847','2024-08-22 08:31:38.792100');
INSERT INTO django_migrations VALUES(55,'products','0018_deliverymethod','2024-08-22 08:31:38.796555');
INSERT INTO django_migrations VALUES(56,'products','0019_merge_20240822_0831','2024-08-22 08:31:38.800040');
CREATE TABLE IF NOT EXISTS "auth_group_permissions" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "group_id" integer NOT NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED, "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE IF NOT EXISTS "auth_user_groups" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "user_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, "group_id" integer NOT NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE IF NOT EXISTS "auth_user_user_permissions" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "user_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE IF NOT EXISTS "django_admin_log" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "action_time" datetime NOT NULL, "object_id" text NULL, "object_repr" varchar(200) NOT NULL, "change_message" text NOT NULL, "content_type_id" integer NULL REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED, "user_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, "action_flag" smallint unsigned NOT NULL CHECK ("action_flag" >= 0));
INSERT INTO django_admin_log VALUES(1,'2024-07-30 13:43:43.852853','1','BITE','[{"added": {}}]',8,1,1);
INSERT INTO django_admin_log VALUES(2,'2024-07-30 13:55:22.979852','1','MA GROSSE BITE SUR LA TETE DE SMIN','[{"added": {}}]',10,1,1);
INSERT INTO django_admin_log VALUES(3,'2024-07-30 13:55:41.941353','1','MA GROSSE BITE SUR LA TETE DE SMIN','',10,1,3);
INSERT INTO django_admin_log VALUES(4,'2024-07-30 13:55:47.581278','1','BITE','',8,1,3);
INSERT INTO django_admin_log VALUES(5,'2024-07-31 13:39:41.207974','2','Législatives 2024','[{"added": {}}]',8,2,1);
INSERT INTO django_admin_log VALUES(6,'2024-07-31 13:40:15.951548','3','Amerika','[{"added": {}}]',8,2,1);
INSERT INTO django_admin_log VALUES(7,'2024-07-31 13:40:55.013975','4','Ch''nord','[{"added": {}}]',8,2,1);
INSERT INTO django_admin_log VALUES(8,'2024-07-31 13:41:08.657083','5','Epitech','[{"added": {}}]',8,2,1);
INSERT INTO django_admin_log VALUES(9,'2024-07-31 13:41:22.729118','6','W@C','[{"added": {}}]',8,2,1);
INSERT INTO django_admin_log VALUES(10,'2024-07-31 13:43:14.685563','1','Polo Amerika Homme avec FaceSwap','[{"added": {}}]',10,2,1);
INSERT INTO django_admin_log VALUES(11,'2024-07-31 13:44:40.554886','2','T-Shirt Amerika Femme avec FaceSwap','[{"added": {}}]',10,2,1);
INSERT INTO django_admin_log VALUES(12,'2024-07-31 13:47:07.781738','3','Polo Ch''nord Homme avec FaceSwap','[{"added": {}}]',10,2,1);
INSERT INTO django_admin_log VALUES(13,'2024-07-31 13:47:50.852504','4','T-Shirt Ch''nord Femme avec FaceSwapAjoutez une dose de rigolade à votre garde-robe avec notre T-Shirt Ch''nord Femme avec FaceSwap. Ce t-shirt met en avant des visages des Tuches dans des situations am','[{"added": {}}]',10,2,1);
INSERT INTO django_admin_log VALUES(14,'2024-07-31 13:48:34.919142','5','Polo Epitech Homme avec FaceSwap','[{"added": {}}]',10,2,1);
INSERT INTO django_admin_log VALUES(15,'2024-07-31 13:49:22.991300','6','T-Shirt Epitech Femme avec FaceSwap','[{"added": {}}]',10,2,1);
INSERT INTO django_admin_log VALUES(16,'2024-07-31 13:51:49.606390','7','Polo Législatives 2024 Homme avec FaceSwap','[{"added": {}}]',10,2,1);
INSERT INTO django_admin_log VALUES(17,'2024-07-31 13:55:52.653629','8','T-Shirt Législatives 2024 Femme avec FaceSwap','[{"added": {}}]',10,2,1);
INSERT INTO django_admin_log VALUES(18,'2024-07-31 13:57:22.546242','9','Polo WAC Homme avec FaceSwap','[{"added": {}}]',10,2,1);
INSERT INTO django_admin_log VALUES(19,'2024-07-31 13:58:20.378553','10','T-Shirt WAC Femme avec FaceSwap','[{"added": {}}]',10,2,1);
INSERT INTO django_admin_log VALUES(20,'2024-07-31 15:29:23.304712','1','Order 1','[{"added": {}}]',9,2,1);
INSERT INTO django_admin_log VALUES(21,'2024-07-31 15:32:40.452796','2','Order 2','[{"added": {}}]',9,2,1);
INSERT INTO django_admin_log VALUES(22,'2024-08-01 09:44:46.778037','3','Order 3','[{"added": {}}]',9,2,1);
INSERT INTO django_admin_log VALUES(23,'2024-08-19 10:53:27.968675','1','yuss27','[{"added": {}}]',15,2,1);
INSERT INTO django_admin_log VALUES(24,'2024-08-20 13:37:33.309873','1','yuss27','[{"changed": {"fields": ["Phone number", "Address", "Postal code", "country"]}}]',15,2,2);
INSERT INTO django_admin_log VALUES(25,'2024-08-26 13:27:05.975912','1','Express','[{"added": {}}]',19,2,1);
INSERT INTO django_admin_log VALUES(26,'2024-08-26 13:27:33.229890','2','Classique','[{"added": {}}]',19,2,1);
INSERT INTO django_admin_log VALUES(27,'2024-08-26 14:14:21.453275','2','Order 2','',9,2,3);
INSERT INTO django_admin_log VALUES(28,'2024-08-26 14:14:21.456683','1','Order 1','',9,2,3);
INSERT INTO django_admin_log VALUES(29,'2024-08-26 14:29:40.044961','1','Maigalour Premium','[{"added": {}}]',18,2,1);
INSERT INTO django_admin_log VALUES(30,'2024-08-26 14:30:54.493225','2','Maigalour','[{"added": {}}]',18,2,1);
INSERT INTO django_admin_log VALUES(31,'2024-08-26 14:32:47.148194','3','PrestaColis (L)','[{"added": {}}]',18,2,1);
INSERT INTO django_admin_log VALUES(32,'2024-08-26 14:33:28.672294','4','PrestaColis (M)','[{"added": {}}]',18,2,1);
INSERT INTO django_admin_log VALUES(33,'2024-08-26 14:34:48.777582','5','PrestaColis (S)','[{"added": {}}]',18,2,1);
CREATE TABLE IF NOT EXISTS "django_content_type" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "app_label" varchar(100) NOT NULL, "model" varchar(100) NOT NULL);
INSERT INTO django_content_type VALUES(1,'admin','logentry');
INSERT INTO django_content_type VALUES(2,'auth','permission');
INSERT INTO django_content_type VALUES(3,'auth','group');
INSERT INTO django_content_type VALUES(4,'auth','user');
INSERT INTO django_content_type VALUES(5,'contenttypes','contenttype');
INSERT INTO django_content_type VALUES(6,'sessions','session');
INSERT INTO django_content_type VALUES(7,'products','cart');
INSERT INTO django_content_type VALUES(8,'products','category');
INSERT INTO django_content_type VALUES(9,'products','order');
INSERT INTO django_content_type VALUES(10,'products','product');
INSERT INTO django_content_type VALUES(11,'products','shippinginfo');
INSERT INTO django_content_type VALUES(12,'products','review');
INSERT INTO django_content_type VALUES(13,'products','orderline');
INSERT INTO django_content_type VALUES(14,'products','cartitem');
INSERT INTO django_content_type VALUES(15,'products','userprofile');
INSERT INTO django_content_type VALUES(16,'products','color');
INSERT INTO django_content_type VALUES(17,'products','size');
INSERT INTO django_content_type VALUES(18,'products','prestataire');
INSERT INTO django_content_type VALUES(19,'products','deliverymethod');
CREATE TABLE IF NOT EXISTS "auth_permission" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "content_type_id" integer NOT NULL REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED, "codename" varchar(100) NOT NULL, "name" varchar(255) NOT NULL);
INSERT INTO auth_permission VALUES(1,1,'add_logentry','Can add log entry');
INSERT INTO auth_permission VALUES(2,1,'change_logentry','Can change log entry');
INSERT INTO auth_permission VALUES(3,1,'delete_logentry','Can delete log entry');
INSERT INTO auth_permission VALUES(4,1,'view_logentry','Can view log entry');
INSERT INTO auth_permission VALUES(5,2,'add_permission','Can add permission');
INSERT INTO auth_permission VALUES(6,2,'change_permission','Can change permission');
INSERT INTO auth_permission VALUES(7,2,'delete_permission','Can delete permission');
INSERT INTO auth_permission VALUES(8,2,'view_permission','Can view permission');
INSERT INTO auth_permission VALUES(9,3,'add_group','Can add group');
INSERT INTO auth_permission VALUES(10,3,'change_group','Can change group');
INSERT INTO auth_permission VALUES(11,3,'delete_group','Can delete group');
INSERT INTO auth_permission VALUES(12,3,'view_group','Can view group');
INSERT INTO auth_permission VALUES(13,4,'add_user','Can add user');
INSERT INTO auth_permission VALUES(14,4,'change_user','Can change user');
INSERT INTO auth_permission VALUES(15,4,'delete_user','Can delete user');
INSERT INTO auth_permission VALUES(16,4,'view_user','Can view user');
INSERT INTO auth_permission VALUES(17,5,'add_contenttype','Can add content type');
INSERT INTO auth_permission VALUES(18,5,'change_contenttype','Can change content type');
INSERT INTO auth_permission VALUES(19,5,'delete_contenttype','Can delete content type');
INSERT INTO auth_permission VALUES(20,5,'view_contenttype','Can view content type');
INSERT INTO auth_permission VALUES(21,6,'add_session','Can add session');
INSERT INTO auth_permission VALUES(22,6,'change_session','Can change session');
INSERT INTO auth_permission VALUES(23,6,'delete_session','Can delete session');
INSERT INTO auth_permission VALUES(24,6,'view_session','Can view session');
INSERT INTO auth_permission VALUES(25,7,'add_cart','Can add cart');
INSERT INTO auth_permission VALUES(26,7,'change_cart','Can change cart');
INSERT INTO auth_permission VALUES(27,7,'delete_cart','Can delete cart');
INSERT INTO auth_permission VALUES(28,7,'view_cart','Can view cart');
INSERT INTO auth_permission VALUES(29,8,'add_category','Can add category');
INSERT INTO auth_permission VALUES(30,8,'change_category','Can change category');
INSERT INTO auth_permission VALUES(31,8,'delete_category','Can delete category');
INSERT INTO auth_permission VALUES(32,8,'view_category','Can view category');
INSERT INTO auth_permission VALUES(33,9,'add_order','Can add order');
INSERT INTO auth_permission VALUES(34,9,'change_order','Can change order');
INSERT INTO auth_permission VALUES(35,9,'delete_order','Can delete order');
INSERT INTO auth_permission VALUES(36,9,'view_order','Can view order');
INSERT INTO auth_permission VALUES(37,10,'add_product','Can add product');
INSERT INTO auth_permission VALUES(38,10,'change_product','Can change product');
INSERT INTO auth_permission VALUES(39,10,'delete_product','Can delete product');
INSERT INTO auth_permission VALUES(40,10,'view_product','Can view product');
INSERT INTO auth_permission VALUES(41,11,'add_shippinginfo','Can add shipping info');
INSERT INTO auth_permission VALUES(42,11,'change_shippinginfo','Can change shipping info');
INSERT INTO auth_permission VALUES(43,11,'delete_shippinginfo','Can delete shipping info');
INSERT INTO auth_permission VALUES(44,11,'view_shippinginfo','Can view shipping info');
INSERT INTO auth_permission VALUES(45,12,'add_review','Can add review');
INSERT INTO auth_permission VALUES(46,12,'change_review','Can change review');
INSERT INTO auth_permission VALUES(47,12,'delete_review','Can delete review');
INSERT INTO auth_permission VALUES(48,12,'view_review','Can view review');
INSERT INTO auth_permission VALUES(49,13,'add_orderline','Can add order line');
INSERT INTO auth_permission VALUES(50,13,'change_orderline','Can change order line');
INSERT INTO auth_permission VALUES(51,13,'delete_orderline','Can delete order line');
INSERT INTO auth_permission VALUES(52,13,'view_orderline','Can view order line');
INSERT INTO auth_permission VALUES(53,14,'add_cartitem','Can add cart item');
INSERT INTO auth_permission VALUES(54,14,'change_cartitem','Can change cart item');
INSERT INTO auth_permission VALUES(55,14,'delete_cartitem','Can delete cart item');
INSERT INTO auth_permission VALUES(56,14,'view_cartitem','Can view cart item');
INSERT INTO auth_permission VALUES(57,15,'add_userprofile','Can add user profile');
INSERT INTO auth_permission VALUES(58,15,'change_userprofile','Can change user profile');
INSERT INTO auth_permission VALUES(59,15,'delete_userprofile','Can delete user profile');
INSERT INTO auth_permission VALUES(60,15,'view_userprofile','Can view user profile');
INSERT INTO auth_permission VALUES(61,16,'add_color','Can add color');
INSERT INTO auth_permission VALUES(62,16,'change_color','Can change color');
INSERT INTO auth_permission VALUES(63,16,'delete_color','Can delete color');
INSERT INTO auth_permission VALUES(64,16,'view_color','Can view color');
INSERT INTO auth_permission VALUES(65,17,'add_size','Can add size');
INSERT INTO auth_permission VALUES(66,17,'change_size','Can change size');
INSERT INTO auth_permission VALUES(67,17,'delete_size','Can delete size');
INSERT INTO auth_permission VALUES(68,17,'view_size','Can view size');
INSERT INTO auth_permission VALUES(69,18,'add_prestataire','Can add prestataire');
INSERT INTO auth_permission VALUES(70,18,'change_prestataire','Can change prestataire');
INSERT INTO auth_permission VALUES(71,18,'delete_prestataire','Can delete prestataire');
INSERT INTO auth_permission VALUES(72,18,'view_prestataire','Can view prestataire');
INSERT INTO auth_permission VALUES(73,19,'add_deliverymethod','Can add delivery method');
INSERT INTO auth_permission VALUES(74,19,'change_deliverymethod','Can change delivery method');
INSERT INTO auth_permission VALUES(75,19,'delete_deliverymethod','Can delete delivery method');
INSERT INTO auth_permission VALUES(76,19,'view_deliverymethod','Can view delivery method');
CREATE TABLE IF NOT EXISTS "auth_group" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(150) NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS "auth_user" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "password" varchar(128) NOT NULL, "last_login" datetime NULL, "is_superuser" bool NOT NULL, "username" varchar(150) NOT NULL UNIQUE, "last_name" varchar(150) NOT NULL, "email" varchar(254) NOT NULL, "is_staff" bool NOT NULL, "is_active" bool NOT NULL, "date_joined" datetime NOT NULL, "first_name" varchar(150) NOT NULL);
INSERT INTO auth_user VALUES(1,'pbkdf2_sha256$260000$KvYjSsCMfFSDNKydV1CjfO$LrGA3DN2JqEL+1b55PvBazzRCIGgCX+p084oxGHPvlE=','2024-07-30 13:42:28.393385',1,'dzk','','alexis.dezeque@outlook.com',1,1,'2024-07-30 13:42:13.097083','');
INSERT INTO auth_user VALUES(2,'pbkdf2_sha256$720000$P1xVt0hPGFgNR3Jgs9D7om$6BbipcfR+W+qnLe19H5zawOhJeMDTF1uUIXp0rmVqhk=','2024-08-19 10:52:20.031801',1,'yuss27','','yelalaili@gmail.com',1,1,'2024-07-31 13:12:06.688973','');
INSERT INTO auth_user VALUES(3,'pbkdf2_sha256$720000$9TKLdR1qPudyclqsurSrTr$6dfS4zqoa0klef7R6J9vCco4s4/14YqynFWk4+vF1FE=',NULL,0,'alberyvick','','alberyvick@email.com',0,1,'2024-08-01 15:24:14.164700','');
INSERT INTO auth_user VALUES(4,'pbkdf2_sha256$720000$jRSCczgiK3uNUZImFRdTCn$/PjGwOc+lnhPMVwGCOn3MeQNHhSokAaqq0HIfjQuXtM=',NULL,0,'hey','','hey@hey.com',0,1,'2024-08-01 15:33:10.100655','');
INSERT INTO auth_user VALUES(5,'pbkdf2_sha256$720000$AJHRQnYOnuZX2GyjK2YMJE$6eTkqt0Wef8x0rX2dhRd411CrVlOfvzypfvDDzHY6pg=',NULL,0,'jasmine','','jasmine@vandomme.com',0,1,'2024-08-02 08:12:19.317651','');
INSERT INTO auth_user VALUES(6,'pbkdf2_sha256$720000$U4DM4AB11gykP8McDlGfcG$RopnBU110998bzOoYkhtbKlhepsS8VsR5olA2gTxmhc=',NULL,0,'ehhh','','ehhh@lavraiment.com',0,1,'2024-08-05 14:15:02.440123','');
INSERT INTO auth_user VALUES(7,'pbkdf2_sha256$720000$0P0EpL4MnX9XimzCgxziX7$DsQY5vlwGJNwzdGWYFHMq4EpgiEOvAtNikuKVYOeC78=',NULL,0,'kapi','bara','kapi@bara.com',0,1,'2024-08-20 13:48:53.713010','kapi');
CREATE TABLE IF NOT EXISTS "products_category" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(100) NOT NULL UNIQUE, "description" text NOT NULL);
INSERT INTO products_category VALUES(2,'Législatives 2024','Collection de faceswapp de personnalité aux législatives Français 2024');
INSERT INTO products_category VALUES(3,'Amerika','Liées aux stars Américaines');
INSERT INTO products_category VALUES(4,'Ch''nord','FaceSwapp de tuches');
INSERT INTO products_category VALUES(5,'Epitech','Liées aux personnalités d''épitech');
INSERT INTO products_category VALUES(6,'W@C','FaceSwap des étudiants de la WAC qui ont approuvés leurs images');
CREATE TABLE IF NOT EXISTS "products_review" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "rating" integer NOT NULL, "comment" text NOT NULL, "created_at" datetime NOT NULL, "product_id" bigint NOT NULL REFERENCES "products_product" ("id") DEFERRABLE INITIALLY DEFERRED, "user_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO products_review VALUES(1,1,'LA VÉRITÉÉÉÉÉÉÉÉÉÉÉ C''EST RINCÉÉÉÉÉÉÉÉÉ !','2024-08-06 10:05:07.222966',10,6);
INSERT INTO products_review VALUES(7,5,'magnifique plaide pour mon chien !','2024-08-08 11:03:20.773901',10,6);
INSERT INTO products_review VALUES(10,4,'peut mieux faire !!!','2024-08-10 19:59:03.651809',9,6);
INSERT INTO products_review VALUES(72,5,'wouaw !','2024-08-10 21:33:23.273401',6,4);
CREATE TABLE IF NOT EXISTS "products_cartitem" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "quantity" integer unsigned NOT NULL CHECK ("quantity" >= 0), "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "cart_id" bigint NOT NULL REFERENCES "products_cart" ("id") DEFERRABLE INITIALLY DEFERRED, "product_id" bigint NOT NULL REFERENCES "products_product" ("id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO products_cartitem VALUES(3,1,'2024-08-11 21:35:37.345770','2024-08-11 21:35:37.350357',2,1);
INSERT INTO products_cartitem VALUES(6,1,'2024-08-19 10:45:14.281887','2024-08-19 10:45:14.285402',1,8);
INSERT INTO products_cartitem VALUES(12,1,'2024-08-26 13:23:10.356334','2024-08-26 13:23:10.361323',3,10);
INSERT INTO products_cartitem VALUES(14,1,'2024-08-26 14:38:56.610084','2024-08-26 14:38:56.616051',4,1);
CREATE TABLE IF NOT EXISTS "products_orderline" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "price" decimal NOT NULL, "order_id" bigint NOT NULL REFERENCES "products_order" ("id") DEFERRABLE INITIALLY DEFERRED, "product_id" bigint NOT NULL REFERENCES "products_product" ("id") DEFERRABLE INITIALLY DEFERRED, "quantity" integer NOT NULL);
CREATE TABLE IF NOT EXISTS "django_session" ("session_key" varchar(40) NOT NULL PRIMARY KEY, "session_data" text NOT NULL, "expire_date" datetime NOT NULL);
INSERT INTO django_session VALUES('vhuugacjnzuwha9s8agwstzq44xyh8wu','.eJxVjEEOwiAQRe_C2hAoAxaX7nsGwjCMVA0kpV0Z765NutDtf-_9lwhxW0vYel7CTOIitDj9bhjTI9cd0D3WW5Op1XWZUe6KPGiXU6P8vB7u30GJvXxrUKTVyDSgdQkHz0o5gwaZCNVI0YJFZxVoRjYAiEaT53P0yNYDWPH-AOz2OCI:1sYn7U:U-usljkOw7CztNwuuisP9jxWF4_MBrTKuU0z4ia_74s','2024-08-13 13:42:28.398119');
INSERT INTO django_session VALUES('vwbkj9xi6bc45ef1qvrtib0fj3saqkjk','.eJxVjEEOwiAQRe_C2pABoS0u3fcMhBkGqRpISrsy3l1JutDte-__l_Bh37LfG69-ieIitDj9Mgz04NJFvIdyq5Jq2dYFZU_kYZuca-Tn9Wj_DnJo-bsGq5QDk1JiBo5EgzHIiKND7WwcDFk-GwZUo1N6Iq0mk0ARdBLYifcH8m838g:1sZ97z:gQiyRjvphyUw0_1ZEKY6D4g6iRxNxJcIgd1tVNkJ8hM','2024-08-14 13:12:27.413942');
INSERT INTO django_session VALUES('fn71v4spyfz8ximheu3o7cpihzqftphl','.eJxVjEEOwiAQRe_C2pABoS0u3fcMhBkGqRpISrsy3l1JutDte-__l_Bh37LfG69-ieIitDj9Mgz04NJFvIdyq5Jq2dYFZU_kYZuca-Tn9Wj_DnJo-bsGq5QDk1JiBo5EgzHIiKND7WwcDFk-GwZUo1N6Iq0mk0ARdBLYifcH8m838g:1sayWr:ChIZidxG_Am03-qG28kabh6aPIsi3aiMxIurO8J5jmU','2024-08-19 14:17:41.412098');
INSERT INTO django_session VALUES('j6tnhqj6ciktxqkklbuqg166p7imubo8','.eJxVjEEOwiAQRe_C2pABoS0u3fcMhBkGqRpISrsy3l1JutDte-__l_Bh37LfG69-ieIitDj9Mgz04NJFvIdyq5Jq2dYFZU_kYZuca-Tn9Wj_DnJo-bsGq5QDk1JiBo5EgzHIiKND7WwcDFk-GwZUo1N6Iq0mk0ARdBLYifcH8m838g:1sfzzo:nFFzNEQpLU54gZqLi_BEG_ooCvRSmF93dMIAVRmME_M','2024-09-02 10:52:20.035663');
CREATE TABLE IF NOT EXISTS "products_cart" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "user_id" integer NULL UNIQUE REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED);
INSERT INTO products_cart VALUES(1,'2024-08-11 21:27:32.673747','2024-08-11 21:27:32.673768',4);
INSERT INTO products_cart VALUES(2,'2024-08-11 21:35:37.334482','2024-08-11 21:35:37.334600',6);
INSERT INTO products_cart VALUES(3,'2024-08-19 15:20:24.741359','2024-08-19 15:20:24.741390',2);
INSERT INTO products_cart VALUES(4,'2024-08-20 14:28:28.548803','2024-08-20 14:28:28.548841',7);
CREATE TABLE products_order (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    delivery_address VARCHAR(255) NOT NULL DEFAULT 'Default Address',
    discount_id INTEGER REFERENCES products_discount(id) DEFERRABLE INITIALLY DEFERRED,
    final_amount DECIMAL(10, 2) NULL
);

CREATE TABLE IF NOT EXISTS "products_product" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(200) NOT NULL UNIQUE, "price" decimal NOT NULL, "description" text NOT NULL, "stock" integer NOT NULL, "available" bool NOT NULL, "category_id" bigint NOT NULL REFERENCES "products_category" ("id") DEFERRABLE INITIALLY DEFERRED, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "image_base64" BLOB NULL, "image" varchar(100) NULL, "weight" decimal NULL);
INSERT INTO products_product VALUES(1,'Polo Amerika Homme avec FaceSwap',40,'Affichez votre admiration pour les célébrités américaines avec notre Polo Amerika Homme avec FaceSwap. Fabriqué en coton de qualité supérieure, ce polo offre un confort inégalé et un design unique mettant en vedette des figures emblématiques américaines. Idéal pour un look casual et tendance !',100,1,3,'2024-07-31 13:43:14.684678','2024-07-31 13:43:14.684701',NULL,'',NULL);
INSERT INTO products_product VALUES(2,'T-Shirt Amerika Femme avec FaceSwap',30,'Craquez pour notre T-Shirt Amerika Femme avec FaceSwap et affichez vos icônes préférées avec style. Ce t-shirt en coton doux propose des visuels amusants de célébrités américaines, parfait pour ajouter une touche d''originalité à votre tenue quotidienne.',100,1,3,'2024-07-31 13:44:40.554215','2024-07-31 13:44:40.554240',NULL,'',NULL);
INSERT INTO products_product VALUES(3,'Polo Ch''nord Homme avec FaceSwap',45,'Plongez dans l''univers hilarant des Tuches avec notre Polo Ch''nord Homme avec FaceSwap. Conçu pour les fans de l''humour décalé, ce polo en coton vous garantit confort et style tout en faisant sourire avec ses visuels inspirés des personnages des Tuches.',45,1,4,'2024-07-31 13:47:07.780964','2024-07-31 13:47:07.780987',NULL,'',NULL);
INSERT INTO products_product VALUES(4,'T-Shirt Ch''nord Femme avec FaceSwapAjoutez une dose de rigolade à votre garde-robe avec notre T-Shirt Ch''nord Femme avec FaceSwap. Ce t-shirt met en avant des visages des Tuches dans des situations am',40,'Ajoutez une dose de rigolade à votre garde-robe avec notre T-Shirt Ch''nord Femme avec FaceSwap. Ce t-shirt met en avant des visages des Tuches dans des situations amusantes, le tout sur un tissu doux et confortable. Parfait pour des moments de détente et de fun !',50,1,4,'2024-07-31 13:47:50.851854','2024-07-31 13:47:50.851876',NULL,'',NULL);
INSERT INTO products_product VALUES(5,'Polo Epitech Homme avec FaceSwap',30,'Montrez votre esprit geek et votre appartenance à la communauté Epitech avec notre Polo Epitech Homme avec FaceSwap. Ce polo est parfait pour les étudiants et les passionnés de technologie, avec des visuels drôles de vos pédagogues préférés. Confort et originalité garantis !',20,1,5,'2024-07-31 13:48:34.916960','2024-07-31 13:48:34.917026',NULL,'',NULL);
INSERT INTO products_product VALUES(6,'T-Shirt Epitech Femme avec FaceSwap',30,'Adoptez un look geek chic avec notre T-Shirt Epitech Femme avec FaceSwap. En coton de haute qualité, ce t-shirt propose des impressions humoristiques de vos enseignants d’Epitech, parfait pour afficher votre esprit de classe et votre sens de l''humour.',20,1,5,'2024-07-31 13:49:22.990691','2024-07-31 13:49:22.990714',NULL,'',NULL);
INSERT INTO products_product VALUES(7,'Polo Législatives 2024 Homme avec FaceSwap',20,'Exprimez votre intérêt pour la politique avec notre Polo Législatives 2024 Homme avec FaceSwap. Ce polo met en scène des visages de politiciens français dans des situations décalées, sur un tissu confortable et stylé. Idéal pour les passionnés de politique et de mode.',200,1,2,'2024-07-31 13:51:49.605487','2024-07-31 13:51:49.605522',NULL,'',NULL);
INSERT INTO products_product VALUES(8,'T-Shirt Législatives 2024 Femme avec FaceSwap',30,'Pour un look engagé et amusant, choisissez notre T-Shirt Législatives 2024 Femme avec FaceSwap. Ce t-shirt propose des impressions de figures politiques françaises en mode FaceSwap, ajoutant une touche d''humour à votre tenue tout en vous assurant un confort optimal.',30,1,2,'2024-07-31 13:55:52.652272','2024-07-31 13:55:52.652344',NULL,'',NULL);
INSERT INTO products_product VALUES(9,'Polo WAC Homme avec FaceSwap',40,'Affichez votre appartenance à la classe WAC avec notre Polo WAC Homme avec FaceSwap. Conçu en coton doux, ce polo présente des visuels amusants de vos camarades de classe, parfait pour un look unique et plein de camaraderie. Idéal pour les événements de classe et les sorties entre amis.',20,1,6,'2024-07-31 13:57:22.545397','2024-07-31 13:57:22.545441',NULL,'',NULL);
INSERT INTO products_product VALUES(10,'T-Shirt WAC Femme avec FaceSwap',35,'Soyez fière de votre classe avec notre T-Shirt WAC Femme avec FaceSwap. Ce t-shirt met en avant des visages de vos camarades dans des situations amusantes, le tout sur un tissu confortable et stylé. Parfait pour afficher votre esprit d’équipe et votre sens de l''humour.',50,1,6,'2024-07-31 13:58:20.376574','2024-07-31 13:58:20.376623',NULL,'',NULL);
CREATE TABLE IF NOT EXISTS "products_userprofile" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "phone_number" varchar(20) NOT NULL, "address" varchar(255) NOT NULL, "postal_code" varchar(20) NOT NULL, "gender" varchar(10) NOT NULL, "user_id" integer NOT NULL UNIQUE REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, "country" varchar(3) NOT NULL);
INSERT INTO products_userprofile VALUES(1,'0612345678','15 rue du kapi','59123','Homme',2,'VN');
INSERT INTO products_userprofile VALUES(2,'0612345678','15 rue du polo','59123','Homme',7,'VN');
CREATE TABLE IF NOT EXISTS "products_color" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(50) NOT NULL, "hex_code" varchar(7) NOT NULL);
CREATE TABLE IF NOT EXISTS "products_product_colors" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "product_id" integer NOT NULL REFERENCES "products_product" ("id") DEFERRABLE INITIALLY DEFERRED, "color_id" bigint NOT NULL REFERENCES "products_color" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE IF NOT EXISTS "products_size" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(5) NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS "products_product_sizes" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "product_id" integer NOT NULL REFERENCES "products_product" ("id") DEFERRABLE INITIALLY DEFERRED, "size_id" bigint NOT NULL REFERENCES "products_size" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE IF NOT EXISTS "products_prestataire" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "nom" varchar(100) NOT NULL, "poids_max_colis" decimal NOT NULL, "dimensions" varchar(50) NOT NULL, "cout_par_mille" decimal NOT NULL, "montant_facture_client" decimal NOT NULL, "ean" varchar(13) NOT NULL);
INSERT INTO products_prestataire VALUES(1,'Maigalour Premium',200,'200x200x200',15000,21.989999999999998436,'8214740000000');
INSERT INTO products_prestataire VALUES(2,'Maigalour',70,'150x100x100',7900,10.990000000000000213,'8214740000000');
INSERT INTO products_prestataire VALUES(3,'PrestaColis (L)',25,'100x70x70',4800,5.9900000000000002131,'9780200000000');
INSERT INTO products_prestataire VALUES(4,'PrestaColis (M)',10,'40x60x60',3200,3.9900000000000002131,'9780200000000');
INSERT INTO products_prestataire VALUES(5,'PrestaColis (S)',4,'15x50x30',2400,2.9900000000000002131,'9780200000000');
CREATE TABLE IF NOT EXISTS "products_shippinginfo" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "address1" varchar(255) NULL, "address2" varchar(255) NULL, "city" varchar(100) NULL, "postal_code" varchar(20) NULL, "country" varchar(100) NULL, "shipping_method" varchar(100) NULL, "shipping_cost" decimal NOT NULL, "estimated_delivery" datetime NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "order_id" bigint NOT NULL UNIQUE REFERENCES "products_order" ("id") DEFERRABLE INITIALLY DEFERRED, "card_number" varchar(16) NULL, "cvv" varchar(3) NULL, "email" varchar(255) NULL, "expiry_date" varchar(5) NULL, "first_name" varchar(100) NULL, "last_name" varchar(100) NULL, "phone" varchar(20) NULL, "tracking_number" varchar(100) NULL UNIQUE);
CREATE TABLE IF NOT EXISTS "products_deliverymethod" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "label" varchar(50) NOT NULL UNIQUE, "price" decimal NOT NULL, "delivery_time" varchar(20) NOT NULL);
INSERT INTO products_deliverymethod VALUES(1,'Express',4.9900000000000002131,'2-3 jours');
INSERT INTO products_deliverymethod VALUES(2,'Classique',0,'14 jours');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('django_migrations',56);
INSERT INTO sqlite_sequence VALUES('django_admin_log',33);
INSERT INTO sqlite_sequence VALUES('django_content_type',19);
INSERT INTO sqlite_sequence VALUES('auth_permission',76);
INSERT INTO sqlite_sequence VALUES('auth_group',0);
INSERT INTO sqlite_sequence VALUES('auth_user',7);
INSERT INTO sqlite_sequence VALUES('products_orderline',0);
INSERT INTO sqlite_sequence VALUES('products_category',6);
INSERT INTO sqlite_sequence VALUES('products_cart',4);
INSERT INTO sqlite_sequence VALUES('products_order',3);
INSERT INTO sqlite_sequence VALUES('products_product',10);
INSERT INTO sqlite_sequence VALUES('products_review',72);
INSERT INTO sqlite_sequence VALUES('products_userprofile',2);
INSERT INTO sqlite_sequence VALUES('products_prestataire',5);
INSERT INTO sqlite_sequence VALUES('products_shippinginfo',1);
INSERT INTO sqlite_sequence VALUES('products_cartitem',14);
INSERT INTO sqlite_sequence VALUES('products_deliverymethod',2);
CREATE UNIQUE INDEX "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions" ("group_id", "permission_id");
CREATE INDEX "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" ("group_id");
CREATE INDEX "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" ("permission_id");
CREATE UNIQUE INDEX "auth_user_groups_user_id_group_id_94350c0c_uniq" ON "auth_user_groups" ("user_id", "group_id");
CREATE INDEX "auth_user_groups_user_id_6a12ed8b" ON "auth_user_groups" ("user_id");
CREATE INDEX "auth_user_groups_group_id_97559544" ON "auth_user_groups" ("group_id");
CREATE UNIQUE INDEX "auth_user_user_permissions_user_id_permission_id_14a6b632_uniq" ON "auth_user_user_permissions" ("user_id", "permission_id");
CREATE INDEX "auth_user_user_permissions_user_id_a95ead1b" ON "auth_user_user_permissions" ("user_id");
CREATE INDEX "auth_user_user_permissions_permission_id_1fbb5f2c" ON "auth_user_user_permissions" ("permission_id");
CREATE INDEX "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" ("content_type_id");
CREATE INDEX "django_admin_log_user_id_c564eba6" ON "django_admin_log" ("user_id");
CREATE UNIQUE INDEX "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type" ("app_label", "model");
CREATE UNIQUE INDEX "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission" ("content_type_id", "codename");
CREATE INDEX "auth_permission_content_type_id_2f476e4b" ON "auth_permission" ("content_type_id");
CREATE INDEX "products_review_product_id_d933ffa7" ON "products_review" ("product_id");
CREATE INDEX "products_review_user_id_2e53b831" ON "products_review" ("user_id");
CREATE INDEX "products_cartitem_cart_id_b75c2d92" ON "products_cartitem" ("cart_id");
CREATE INDEX "products_cartitem_product_id_e735c06a" ON "products_cartitem" ("product_id");
CREATE INDEX "products_orderline_order_id_7be7486c" ON "products_orderline" ("order_id");
CREATE INDEX "products_orderline_product_id_035f6fd0" ON "products_orderline" ("product_id");
CREATE INDEX "django_session_expire_date_a5c62663" ON "django_session" ("expire_date");
CREATE INDEX "products_order_customer_id_6cb09035" ON "products_order" ("customer_id");
CREATE INDEX "products_product_category_id_9b594869" ON "products_product" ("category_id");
CREATE UNIQUE INDEX "products_product_colors_product_id_color_id_28f4cef1_uniq" ON "products_product_colors" ("product_id", "color_id");
CREATE INDEX "products_product_colors_product_id_af745b3e" ON "products_product_colors" ("product_id");
CREATE INDEX "products_product_colors_color_id_27abec57" ON "products_product_colors" ("color_id");
CREATE UNIQUE INDEX "products_product_sizes_product_id_size_id_1c8c3d5d_uniq" ON "products_product_sizes" ("product_id", "size_id");
CREATE INDEX "products_product_sizes_product_id_7cf7aa08" ON "products_product_sizes" ("product_id");
CREATE INDEX "products_product_sizes_size_id_e0cab160" ON "products_product_sizes" ("size_id");
CREATE TABLE IF NOT EXISTS "products_facturationdata" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
    "user_id" integer REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, 
    "first_name" varchar(100) NULL, 
    "last_name" varchar(100) NULL, 
    "email" varchar(255) NULL, 
    "phone" varchar(20) NULL, 
    "address1" varchar(255) NULL, 
    "address2" varchar(255) NULL, 
    "city" varchar(100) NULL, 
    "postal_code" varchar(20) NULL, 
    "country" varchar(100) NULL, 
    "card_number" varchar(16) NULL, 
    "expiry_date" varchar(5) NULL, 
    "cvv" varchar(3) NULL, 
    "created_at" datetime NOT NULL, 
    "updated_at" datetime NOT NULL
);

ALTER TABLE "products_userprofile"
ADD COLUMN "capy_coins" integer NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS "products_discount" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
    "code" varchar(50) NOT NULL UNIQUE, 
    "value" decimal(5,2) CHECK (value >= 0 AND value <= 100) NOT NULL, 
    "start_date" datetime NOT NULL, 
    "end_date" datetime NOT NULL, 
    "active" bool NOT NULL DEFAULT True
);

COMMIT;