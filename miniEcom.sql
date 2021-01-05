/*==============================================================*/
/* Nom de SGBD :  MySQL 5.0                                     */
/* Date de cr�ation :  1/4/2021 5:33:09 PM                      */
/*==============================================================*/


drop table if exists category;

drop table if exists product;

/*==============================================================*/
/* Table : category                                             */
/*==============================================================*/
create table category
(
   id_category          bigint not null,
   name                 varchar(254),
   primary key (id_category)
);

/*==============================================================*/
/* Table : product                                              */
/*==============================================================*/
create table product
(
   id_product           bigint not null,
   id_category          bigint,
   name                 varchar(254),
   price                float,
   primary key (id_product)
);

alter table product add constraint FK_Association_1 foreign key (id_category)
      references category (id_category) on delete restrict on update restrict;

