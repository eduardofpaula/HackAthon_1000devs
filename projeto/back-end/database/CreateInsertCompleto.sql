/*==============================================================*/
/* Table: CAMPANHA                                              */
/*==============================================================*/
create table CAMPANHA 
(
   ID_CAMPANHA          INTEGER                        not null,
   DESCRICAO            TEXT                           not null,
   DATA_INICIO          DATE                           not null,
   DATA_FIM             DATE                           not null,
   constraint PK_CAMPANHA primary key (ID_CAMPANHA)
);

/*==============================================================*/
/* Table: CAMPANHAVACINA                                        */
/*==============================================================*/
create table CAMPANHAVACINA 
(
   ID_CAMPANHA          INTEGER                        not null,
   ID_VACINA            INTEGER                        not null,
   constraint PK_CAMPANHAVACINA primary key (ID_CAMPANHA, ID_VACINA)
);

/*==============================================================*/
/* Table: PACIENTE                                              */
/*==============================================================*/
create table PACIENTE 
(
   ID_PACIENTE          INTEGER                        not null,
   NOME                 TEXT                           not null,
   DATA_NASCIMENTO      DATE                           not null,
   constraint PK_PACIENTE primary key (ID_PACIENTE)
);

/*==============================================================*/
/* Table: PERIODOAPLICACAOANO                                   */
/*==============================================================*/
create table PERIODOAPLICACAOANO 
(
   ID                   INTEGER                        not null,
   ID_VACINA            INTEGER                        not null,
   QTD_ANO_INICIAL      INTEGER                        not null,
   QTD_ANO_FINAL        INTEGER                        not null,
   DESC_ANO             TEXT                           not null,
   constraint PK_PERIODOAPLICACAOANO primary key (ID)
);

/*==============================================================*/
/* Table: PERIODOAPLICACAOMES                                   */
/*==============================================================*/
create table PERIODOAPLICACAOMES 
(
   ID                   INTEGER                        not null,
   ID_VACINA            INTEGER                        not null,
   QTD_MESES_INICIAL    INTEGER                        not null,
   QTD_MESES_FINAL      INTEGER                        not null,
   DESC_MESES           TEXT                           not null,
   constraint PK_PERIODOAPLICACAOMES primary key (ID)
);

/*==============================================================*/
/* Table: REDE                                                  */
/*==============================================================*/
create table REDE 
(
   ID_REDE              INTEGER                        not null,
   TIPO_REDE            TEXT                           not null,
   constraint PK_REDE primary key (ID_REDE)
);

/*==============================================================*/
/* Table: VACINA                                                */
/*==============================================================*/
create table VACINA 
(
   ID_VACINA            INTEGER                        not null,
   VACINA               TEXT                           not null,
   SIGLA_VACINA         TEXT                           not null,
   DOENCA_PROTECAO      TEXT                           not null,
   DOSE                 TEXT                           not null,
   ID_REDE              INTEGER                        not null,
   constraint PK_VACINA primary key (ID_VACINA)
);

/*==============================================================*/
/* Table: VACINAAPLICADA                                        */
/*==============================================================*/
create table VACINAAPLICADA 
(
   ID_PACIENTE          INTEGER                        not null,
   ID_VACINA            INTEGER                        not null,
   DATA_APLICACAO       DATE                           not null,
   constraint PK_VACINAAPLICADA primary key (ID_PACIENTE, ID_VACINA)
);

alter table CAMPANHAVACINA
   add constraint CAMPANHAVACINA_CAMPANHA foreign key (ID_CAMPANHA)
      references CAMPANHA (ID_CAMPANHA)
      on update restrict
      on delete restrict;

alter table CAMPANHAVACINA
   add constraint CAMPANHAVACINA_VACINA foreign key (ID_VACINA)
      references VACINA (ID_VACINA)
      on update restrict
      on delete restrict;

alter table PERIODOAPLICACAOANO
   add constraint PERIODOAPLICACAOANO_VACINA foreign key (ID_VACINA)
      references VACINA (ID_VACINA)
      on update restrict
      on delete restrict;

alter table PERIODOAPLICACAOMES
   add constraint PERIODOAPLICACAOMES_VACINA foreign key (ID_VACINA)
      references VACINA (ID_VACINA)
      on update restrict
      on delete restrict;

alter table VACINA
   add constraint VACINA_REDE foreign key (ID_REDE)
      references REDE (ID_REDE)
      on update restrict
      on delete restrict;

alter table VACINAAPLICADA
   add constraint VACINAAPLICADA_PACIENTE foreign key (ID_PACIENTE)
      references PACIENTE (ID_PACIENTE)
      on update restrict
      on delete restrict;

alter table VACINAAPLICADA
   add constraint VACINAAPLICADA_VACINA foreign key (ID_VACINA)
      references VACINA (ID_VACINA)
      on update restrict
      on delete restrict;

/*==============================================================*/
/* Table: INSERT                                                */
/*==============================================================*/

INSERT INTO Rede (id_rede, tipo_rede) VALUES ('1', 'Rede Pública');
INSERT INTO Rede (id_rede, tipo_rede) VALUES ('2', 'Rede Privada');

INSERT INTO Vacina VALUES ('1', 'BCG', 'BCG', 'Formas graves da Tuberculose', 'Dose única', '1');
INSERT INTO Vacina VALUES ('2', 'Hepatite B', 'HB', 'Hepatite B', '1ª Dose', '1');
INSERT INTO Vacina VALUES ('3', 'Vacina Pentavalente', 'dovia_admini', 'Difteria, Tétano, Coqueluche e Doenças Causadas pelo Hemófilos Influenzae tipo B (Meningite, Pneumonia) e Hepatite B', '1ª Dose', '1');
INSERT INTO Vacina VALUES ('4', 'Vacina Inativada contra a Poliomielite', 'VIP', 'Poliomielite ou Parasilia Infantil', '1ª Dose', '1');
INSERT INTO Vacina VALUES ('5', 'Vacina Oral Rotavírus Humano', 'VORH', 'Gastroenterite causada pelo Rotavírus', '1ª Dose', '1');
INSERT INTO Vacina VALUES ('6', 'Pneumocócica 10', 'Pneumo 10', 'Doenças causadas pelos pneumococos (Meningite, Pneumonia, Otite, etc.)', '1ª Dose', '1');
INSERT INTO Vacina VALUES ('7', 'Meningocócica C', 'Meningo C', 'Meningite Meningocócica Tipo C', '1ª Dose', '1');
INSERT INTO Vacina VALUES ('8', 'Vacina Pentavalente', 'Penta', 'Difteria, Tétano, Coqueluche e Doenças Causadas pelo Hemófilos Influenzae tipo B (Meningite, Pneumonia) e Hepatite B', '2ª Dose', '1');
INSERT INTO Vacina VALUES ('9', 'Vacina Inativada contra a Poliomielite', 'VIP', 'Poliomielite ou Parasilia Infantil', '2ª Dose', '1');
INSERT INTO Vacina VALUES ('10', 'Vacina Oral Rotavírus Humano', 'VRH', 'Gastroenterite causada pelo Rotavírus', '2ª Dose', '1');
INSERT INTO Vacina VALUES ('11', 'Pneumocócica 10', 'Pneumo 10', 'Doenças causadas pelos pneumococos (Meningite, Pneumonia, Otite, etc.)', '2ª Dose', '1');
INSERT INTO Vacina VALUES ('12', 'Meningocócica C', 'Meningo C', 'Meningite Meningocócica Tipo C', '2ª Dose', '1');
INSERT INTO Vacina VALUES ('13', 'Pneumocócica 10', 'Pneumo 10', 'Doenças causadas pelos pneumococos (Meningite, Pneumonia, Otite, etc.)', '3ª Dose', '1');
INSERT INTO Vacina VALUES ('14', 'Vacina Oral contra Poliomielite', 'VOP', 'Poliomielite ou Parasilia Infantil', '3ª Dose', '1');
INSERT INTO Vacina VALUES ('15', 'Vacina Pentavalente', 'Penta', 'Difteria, Tétano, Coqueluche e Doenças Causadas pelo Hemófilos Influenzae tipo B (Meningite, Pneumonia) e Hepatite B', '3ª Dose', '1');
INSERT INTO Vacina VALUES ('16', 'Febre Amarela', 'FA', 'Febre Amarela', 'Dose Inicial', '1');
INSERT INTO Vacina VALUES ('17', 'Hepatite A', 'HA', 'Hepatite A', 'Dose', '1');
INSERT INTO Vacina VALUES ('18', 'Tríplice Viral', 'SCR', 'Sarampo, Caxumba e Rubéola', '1ª Dose', '1');
INSERT INTO Vacina VALUES ('19', 'Pneumocócica 10', 'Pneumo 10', 'Doenças causadas pelos pneumococos (Meningite, Pneumonia, Otite, etc.)', 'Reforço', '1');
INSERT INTO Vacina VALUES ('20', 'Tríplice Bacteriana', 'DTP', 'Difteria, Tétano, Coqueluche', '1º Reforço', '1');
INSERT INTO Vacina VALUES ('21', 'Vacina Oral contra Poliomielite', 'VOP', 'Poliomielite ou Parasilia Infantil', 'Reforço', '1');
INSERT INTO Vacina VALUES ('22', 'Meningocócica C', 'Meningo C', 'Meningite Meningocócica Tipo C', 'Reforço', '1');
INSERT INTO Vacina VALUES ('23', 'Tetra Viral', 'Tetra', 'Sarampo, Caxumba, Rubéola e Varicela', '1 Doses', '1');
INSERT INTO Vacina VALUES ('24', 'Tríplice Bacteriana', 'DTP', 'Difteria, Tétano, Coqueluche', '2º Reforço', '1');
INSERT INTO Vacina VALUES ('25', 'Febre Amarela', 'FA', 'Febre Amarela', 'Reforço', '1');
INSERT INTO Vacina VALUES ('26', 'Vacina Oral contra Poliomielite', 'VOP', 'Poliomielite ou Parasilia Infantil', '2º Reforço', '1');
INSERT INTO Vacina VALUES ('27', 'Vacina Varicela Monovalente', 'Varicela', 'Varicela', '1ª Dose', '1');
INSERT INTO Vacina VALUES ('28', 'Febre Amarela', 'FA', 'Febre Amarela', '1ª Dose', '1');
INSERT INTO Vacina VALUES ('29', 'Pneumocócica 23', 'Pneumo 23', 'Proteção contra infecções invasivas pelo pneumococo na população indígena', '1ª Dose', '1');
INSERT INTO Vacina VALUES ('30', 'HPV', 'HPV', 'Papilomavírus', 'null', '1');
INSERT INTO Vacina VALUES ('31', 'Febre Amarela', 'FA', 'Febre Amarela', '1 Dose a cada 10 anos', '1');
INSERT INTO Vacina VALUES ('32', 'Hepatite B', 'HB', 'Hepatite B', '1ª Dose', '1');
INSERT INTO Vacina VALUES ('33', 'Febre Amarela', 'FA', 'Febre Amarela', '1 Dose a cada 10 anos', '1');
INSERT INTO Vacina VALUES ('34', 'Tríplice Viral', 'SCR', 'Sarampo, Caxumba e Rubéola', '2 doses', '1');
INSERT INTO Vacina VALUES ('35', 'Dupla Adulto', 'DT', 'Difteria e Tétano', 'Após completar esquema de 3 doses, fazer reforço a cada 10 anos', '1');
INSERT INTO Vacina VALUES ('36', 'Hepatite B', 'HB', 'Hepatite B', '3 doses (até 49 anos)', '1');
INSERT INTO Vacina VALUES ('37', 'Dupla Adulto', 'DT', 'Difteria e Tétano', 'Após completar esquema de 3 doses, fazer reforço a cada 10 anos', '1');
INSERT INTO Vacina VALUES ('38', 'Febre Amarela', 'FA', 'Febre Amarela', '1 Dose a cada 10 anos', '1');
INSERT INTO Vacina VALUES ('39', 'Tríplice Viral', 'SCR', 'Sarampo, Caxumba e Rubéola', '1 dose (até 49 anos)', '1');
INSERT INTO Vacina VALUES ('40', 'Febre Amarela', 'FA', 'Febre Amarela', '1 Dose a cada 10 anos', '1');
INSERT INTO Vacina VALUES ('41', 'Influenza Sazonal', 'Influenza', 'Influenza (Gripe)', 'Dose anual', '1');
INSERT INTO Vacina VALUES ('42', 'Pneumocócica 23', 'Pneumo 23', 'Doenças causadas pelos pneumococos (Meningite, Pneumonia, Otite, etc.)', 'Dose única', '1');
INSERT INTO Vacina VALUES ('43', 'Vacina Dengue', 'QDENGA', 'Quatro sorotipos de dengue: DEN1, DEN2, DEN3 e DEN4', '2 doses a cada 3 meses', '2');
INSERT INTO Vacina VALUES ('44', 'Febre Tifóide', 'FT', 'Protege contra a bactéria Salmonella entérica sorotipo Typhi', '1 dose a cada 3 anos', '2');
INSERT INTO Vacina VALUES ('45', 'Meningocócica ACWY', 'Meningo ACWY', 'Meningite Meningocócica Tipo A, C, W e Y', '1ª Dose', '2');
INSERT INTO Vacina VALUES ('46', 'Meningocócica ACWY', 'Meningo ACWY', 'Meningite Meningocócica Tipo A, C, W e Y', '2ª Dose', '2');
INSERT INTO Vacina VALUES ('47', 'Meningocócica ACWY', 'Meningo ACWY', 'Meningite Meningocócica Tipo A, C, W e Y', 'Reforço', '2');
INSERT INTO Vacina VALUES ('48', 'Vacina Herpes Zóster', 'SHINGRIX', 'Previne o herpes zóster, popularmente conhecido como “cobreiro”', '2  doses a cada 2 meses', '2');
INSERT INTO Vacina VALUES ('49', 'Meningocócica B', 'Meningo B', 'Meningite Meningocócica Tipo B', '1ª Dose', '2');
INSERT INTO Vacina VALUES ('50', 'Meningocócica B', 'Meningo B', 'Meningite Meningocócica Tipo B', '2ª Dose', '2');
INSERT INTO Vacina VALUES ('51', 'Meningocócica B', 'Meningo B', 'Meningite Meningocócica Tipo B', 'Reforço', '2');

INSERT INTO Paciente VALUES ('1', 'José da Silva Pereira', '6/15/75');
INSERT INTO Paciente VALUES ('2', 'Luiza Camargo', '8/5/23');
INSERT INTO Paciente VALUES ('3', 'Ana Beatriz Cardoso Louzano', '6/7/90');
INSERT INTO Paciente VALUES ('4', 'Oseias Bocafoli Henriques', '10/3/22');
INSERT INTO Paciente VALUES ('5', 'Adelir Matos Alfradique', '9/6/98');
INSERT INTO Paciente VALUES ('6', 'Jayne Firmino Marins', '5/7/42');
INSERT INTO Paciente VALUES ('7', 'Roberta Santomauro Bernardes', '10/14/66');
INSERT INTO Paciente VALUES ('8', 'Izabel Dinis Dutra', '3/3/07');
INSERT INTO Paciente VALUES ('9', 'Márcio Cardoso Nigro', '5/30/56');
INSERT INTO Paciente VALUES ('10', 'Rita Schuenck Marins', '5/23/82');

INSERT INTO VacinaAplicada VALUES ('2', '1', '8/6/23');
INSERT INTO VacinaAplicada VALUES ('2', '2', '8/6/23');
INSERT INTO VacinaAplicada VALUES ('2', '3', '9/7/23');
INSERT INTO VacinaAplicada VALUES ('2', '4', '9/7/23');
INSERT INTO VacinaAplicada VALUES ('2', '5', '9/7/23');
INSERT INTO VacinaAplicada VALUES ('2', '6', '9/7/23');
INSERT INTO VacinaAplicada VALUES ('2', '7', '10/9/23');
INSERT INTO VacinaAplicada VALUES ('4', '1', '10/3/22');
INSERT INTO VacinaAplicada VALUES ('4', '2', '10/3/22');
INSERT INTO VacinaAplicada VALUES ('4', '3', '11/4/22');
INSERT INTO VacinaAplicada VALUES ('4', '4', '11/4/22');
INSERT INTO VacinaAplicada VALUES ('4', '5', '11/4/22');
INSERT INTO VacinaAplicada VALUES ('4', '6', '11/4/22');
INSERT INTO VacinaAplicada VALUES ('4', '7', '12/4/22');
INSERT INTO VacinaAplicada VALUES ('4', '8', '1/2/23');
INSERT INTO VacinaAplicada VALUES ('4', '9', '1/2/23');
INSERT INTO VacinaAplicada VALUES ('4', '10', '1/2/23');
INSERT INTO VacinaAplicada VALUES ('4', '11', '1/2/23');
INSERT INTO VacinaAplicada VALUES ('4', '12', '2/3/23');
INSERT INTO VacinaAplicada VALUES ('4', '13', '4/4/23');
INSERT INTO VacinaAplicada VALUES ('4', '14', '4/4/23');
INSERT INTO VacinaAplicada VALUES ('4', '15', '4/4/23');
INSERT INTO VacinaAplicada VALUES ('4', '16', '7/6/23');
INSERT INTO VacinaAplicada VALUES ('4', '17', '10/3/23');
INSERT INTO VacinaAplicada VALUES ('4', '18', '10/3/23');
INSERT INTO VacinaAplicada VALUES ('4', '19', '10/3/23');

INSERT INTO PeriodoAplicacaoMes VALUES ('1', '1', '0', '0', 'Ao nascer');
INSERT INTO PeriodoAplicacaoMes VALUES ('2', '2', '0', '0', 'Ao nascer');
INSERT INTO PeriodoAplicacaoMes VALUES ('3', '3', '2', '2', '2 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('4', '4', '2', '2', '2 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('5', '5', '2', '2', '2 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('6', '6', '2', '2', '2 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('7', '7', '3', '3', '3 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('8', '8', '4', '4', '4 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('9', '9', '4', '4', '4 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('10', '10', '4', '4', '4 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('11', '11', '4', '4', '4 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('12', '12', '5', '5', '5 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('13', '13', '6', '6', '6 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('14', '14', '6', '6', '6 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('15', '15', '6', '6', '6 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('16', '16', '9', '9', '9 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('17', '17', '12', '12', '12 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('18', '18', '12', '12', '12 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('19', '19', '12', '12', '12 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('20', '20', '15', '15', '15 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('21', '21', '15', '15', '15 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('22', '22', '15', '15', '15 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('23', '23', '15', '15', '15 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('34', '45', '3', '3', '3 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('35', '46', '5', '5', '5 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('36', '47', '12', '15', '12 e 15 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('37', '49', '3', '3', '3 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('38', '50', '5', '5', '5 meses');
INSERT INTO PeriodoAplicacaoMes VALUES ('39', '51', '12', '15', '12 e 15 meses');

INSERT INTO PeriodoAplicacaoAno VALUES ('1', '24', '4', '4', '4 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('2', '25', '4', '4', '4 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('3', '26', '4', '4', '4 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('4', '27', '4', '4', '4 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('5', '28', '5', '5', '5 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('6', '29', '5', '5', '5 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('7', '30', '9', '10', '9 a 10 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('8', '31', '10', '10', '10 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('9', '32', '10', '19', '10 a 19 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('10', '33', '10', '19', '10 a 19 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('11', '34', '10', '19', '10 a 19 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('12', '35', '10', '19', '10 a 19 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('13', '36', '20', '59', '20 a 59 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('14', '37', '20', '59', '20 a 59 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('15', '38', '20', '59', '20 a 59 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('16', '39', '20', '59', '20 a 59 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('17', '40', '60', '150', '60 anos e mais');
INSERT INTO PeriodoAplicacaoAno VALUES ('18', '41', '60', '150', '60 anos e mais');
INSERT INTO PeriodoAplicacaoAno VALUES ('19', '42', '60', '150', '60 anos e mais');
INSERT INTO PeriodoAplicacaoAno VALUES ('20', '43', '4', '60', '4 a 60 anos');
INSERT INTO PeriodoAplicacaoAno VALUES ('21', '44', '2', '150', '2 anos e mais');
INSERT INTO PeriodoAplicacaoAno VALUES ('22', '48', '50', '150', '50 anos e mais');

INSERT INTO Campanha VALUES ('1', 'Campanha de vacinação Febre Amarela', '1/1/24', '7/1/24');
INSERT INTO Campanha VALUES ('2', 'Campanha de vacinação da Tríplice Viral', '1/1/24', '12/31/24');
INSERT INTO Campanha VALUES ('3', 'Campanha Nacional de Vacinação Contra a Influenza 2023', '1/1/23', '12/31/23');

INSERT INTO CampanhaVacina VALUES ('1', '16');
INSERT INTO CampanhaVacina VALUES ('2', '39');
INSERT INTO CampanhaVacina VALUES ('3', '41');