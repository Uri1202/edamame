#敵



from ctypes.wintypes import HPALETTE
from curses.ascii import SP
from distutils.debug import DEBUG
from lib2to3.pgen2.token import AT
from msilib.schema import MsiPatchHeaders
from unicodedata import name


class Enemy():

    name =""
    hp   =0
    at   =0
    mp   =0
    de   =0
    sp   =0
    attar =""



    def __init__(self,name,hp,at,mp,de,sp,attr):  
        

    self.name = name
    self.hp   = hp
    self.at   = at
    self.mp   = mp
    self.de   = de
    self.sp   = sp
    self.attr = attr

class Enemy1(Enemy):
    def __init__(self,name,hp,at,mp,de,sp,attr):
        super().__init__(name,hp,at,mp,de,sp,attr)
        Slime =("Slime",1000,500,10,100,50,"mizu")


class Enemy2(Enemy):
    def __init__(self,name,hp,at,mp,de,sp,attr):
        super().__init__(name,hp,at,mp,de,sp,attr)
        Goblins =("Goblins",1000,500,10,100,50,"hono")



class Enemy3(Enemy):
    def __init__(self,name,hp,at,mp,de,sp,attr):
        super().__init__(name,hp,at,mp,de,sp,attr)
        Golem =("Golem",1000,500,10,100,50,"kusa")       


class Boss():

    name   =""
    hp     =0
    at     =0
    mp     =0
    de     =0
    sp     =0
    attar  =""
    sk     =""         #sk=special skill



    def __init__(self,name,hp,at,mp,de,sp,attr,sk):  
        

    self.name = name
    self.hp   = hp
    self.at   = at
    self.mp   = mp
    self.de   = de
    self.sp   = sp
    self.attr = attr
    self.sk   = sk



class Boss1(Boss):
    def __init__(self,name,hp,at,mp,de,sp,attr,sk):
        super().__init__(name,hp,at,mp,de,sp,attr,sk)
        Poseidon =("Poseidon",2000,1000,20,300,150,"mizu","津波")


class Boss2(Boss):
    def __init__(self,name,hp,at,mp,de,sp,attr,sk):
        super().__init__(name,hp,at,mp,de,sp,attr,sk)
        Dragon =("Dragon",2000,1000,20,300,150,"hono","竜の息吹き")


class Boss3(Boss):
    def __init__(self,name,hp,at,mp,de,sp,attr,sk):
        super().__init__(name,hp,at,mp,de,sp,attr,sk)
        Mao =("Mao",3000,1000,20,300,150,"kusa","Fにしますよ")    #ラスボス


        



   


        
    


    










          