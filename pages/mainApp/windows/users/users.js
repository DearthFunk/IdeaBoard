ideaBoard.controller('users', ['$scope', 'dataService', '$http',
    function($scope,dataService,$http) {

        var tempUser = {
            fName: "",
            lName: "",
            email: "",
            enabled: true,
            password1: "",
            password2: "",
            permissions: {
                boardmanagement:false,
                settings:false,
                votingmechanics: false,
                users: false,
                reports: false
            },
            profileImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQYAAAEGCAYAAACHNTs8AAAOJ0lEQVR4Xu3dy2EbxxJAUSgPIx8rAzoDY8GXgbCAMjAXdAZGBlY+UB58lCjrQxLs/0z39PGW1TXTt6qvawYg9W7nPwQQQOAZgXeIIIAAAs8JEIOeQACBFwSIQVMggAAx6AEEEAgTMDGEGYlAYDoCxDBdyW0YgTABYggzEoHAdASIYbqS2zACYQLEEGYkAoHpCBDDdCW3YQTCBIghzEgEAtMRIIbpSm7DCIQJEEOYkQgEpiNADNOV3IYRCBMghjAjEQhMR4AYpiu5DSMQJkAMYUYiEJiOADFMV3IbRiBMgBjCjEQgMB0BYpiu5DaMQJgAMYQZiUBgOgLEMF3JbRiBMAFiCDMSgcB0BIhhupLbMAJhAsQQZiQCgekIEMN0JbdhBMIEiCHMSAQC0xEghulKbsMIhAkQQ5iRCASmI0AM05XchhEIEyCGMCMRCExHgBimK7kNIxAmQAxhRiIQmI4AMUxXchtGIEyAGMKMRCAwHQFimK7kNoxAmAAxhBmJQGA6AsQwXcltGIEwAWIIMxKBwHQEiGG6ktswAmECxBBmJAKB6QgQw3Qlt2EEwgSIIcxIBALTESCG6UpuwwiECRBDmJEIBKYjQAzTldyGEQgTIIYwIxEITEeAGCYr+el0ejgePyTt+ubmj935fNYrSdTGDlbsset39e5zBJCH4p0eygPX9SpF7bo8qTf38JC6omb86fRxdzwe9VRNqCvlUsSVwNe77LoyuLYPkqhX4TUyEcMa1Iuv2acMrm/L40ZxyRdOQAwLA8+93OVy+X2//+3f3PX9rCOJfmrxhspHuMmZ73G5l4hLUyaIpYmnXM/EkEJr8djRHhlyABFEDrXWa4ihNeGs/DMI4QeY+/u/d4fDQS9m9UqbRYrRhmtW1pubm4fz+Z+stdtYZHropY7E0EsldnNNCdew+5ZlHw1JDF3UgRRelsH0sGZrEsOa9E0JAfrksFZ7EsNa5Ekhkjw5RIKqGkYMVXHGJvPoEEvqS5z3Dim06sQSQx2OCVlIIQHWs1DTQz67tJXEkMarMJoUCgE+LieHcobhDMQQZlQcsZ3fcyhGUSkBOVQCeTUNMbQm/DW/SaE+ZnKoz/RHRmJoSZcUGtMlh1aAiaEVWVJoSvan/7fp4QakQW0A9Smlx4dmaH9KfLl8fr/f7z8tca2ZrkEMTapNCk2wXn9Vpo8rAwe0MlCfQFQGGp3O+4ZoVBGBxBABKS3EtJDGq2Y0OdSiSQy1SHqvUJVkfjJyyGf30yvdGknk8LKxnx4ghhq1MDHUoGhaqEaxTiJyKOVIDKUESaEKwbpJiKGUJzGUEiSGKgTrJyGHEqbEUEKPFIrptUtADCVsiaGEnm83FtFrv5gcchkTQy4500IRueUWk0MOa2LIoUYK2dSWX0gMOcyJIYcaMWRTW3qhvxeZR5wY8rg9rvLV52x0iy80NaQiJ4ZUYqaFLGJrLvKr2en0iSGdmWkhi9nai0wNKRUghhRapoVkWv0sIIaUWhBDCi1iSKbVywIvIdMqQQwJvO7v7x8Ohz8TVgjti4CpIbYexBBLyrSQRKrPYGKIrQsxxJIihiRSPQbf3v5vd3d3p+cjigNSBKQfIb67kISry2BTQ0xZiCGGkmkhmlL/gcQQUyNiiKFEDNGU+g8khpgaEUMMJWKIpjRGIDmE6kQMIULff+79QjSq7gOJIVQiYggRIoZoQuMEEkOoVsQQIvT4c19sioA0VAgxhMpFDCFC3i9EERoriBhC9SKGECFiiCI0VhAxhOpFDCFCxBBFaKSg0+nj7ng86v03igZOVEf7RCIK01BBpoa3ykUMUc1MDFGYhgoiBmIoblhiKEbYXQJiIIbipiSGYoTdJSAGYihuSmIoRthdAmIghuKmJIZihN0lIAZiKG5KYihG2F0CYiCG4qYkhmKE3SUgBmIobkpiKEbYXQJiIIbipiSGYoTdJSAGYihuSmIoRthdAmIghuKmJIZihB0l8I/PhIvhK9FhRo8RxBCFaZgg00KoVMQQIvT158QQhWmYIGIIlYoYQoSIIYrQWEHEEKoXMYQIPf7cn3aLgDRUCDGEykUMIULff+5xIhpV94HEECoRMYQIEUM0oXECiSFUK2IIESKGaEIjBN7f/707HA76PlAsgKK72aNENKquA00LMeUhhhhKpoYkSn0HE0NMfYghhhIxJFHqO5gYYupDDDGUiCGJUr/BpBBbG2KIJfUYdzqdHo7HDwkrhPZFgBhi60EMsaRMDcmk+ltADLE1IYZYUsSQTKqvBaSQUg9iSKH1GHt7e/twd/dX4irh6xMghpQaEEMKLVNDFq21F/n7C+kVIIZ0Zo8rfNkpC9tqi0wLqeiJIZWYqSGb2HoLiSGVPTGkEiOGbGLrLCSFHO7EkEONHIqoLbuYGHJ4E0MONWIoorbUYr9JmU+aGPLZfVvpRWQxwmYJTAu5aIkhl5ypoZhc2wSkUMKXGErokUMVem2SEEMJV2IoofdtrT8WWwFi1RSkUIqTGEoJmhqqEayR6HL5/H6/33+qkWvmHMRQtfpeRFbFmZXMtJCF7dkiYqhB8VsOv2BVEWZWKlLIwvbKImKoRdIjRXWSaQlJIY3X29HEUJMmOTShGZeUGOI4xUURQxynjCjvGzKgZS4hhUxwV5cRQ22iv+Qjh6Z4vyYnhRaMiaEF1W85fb+hIVxSaAqXGJri/ZLc1NAGsUmhDdenrMTQku733ORQFzMp1OX5MhsxtCZMDpUJk0JloK+mI4YlKJNDJcqkUAlkMA0xBBHVDvBYkUeUFPK45a0ihjxuRat8dToVHymkEiuNJ4ZSgkXrTQ9hfKQQZlQ/ghjqM03MSA6vATudPu6Ox6P+TOymWuHA1yJZkOdyufy+3//2b0GKjS01JaxdUGJYuwK/XN/04CvOfTQkMfRRh+93cTqdHo7HD53d1RK3Y0pYgnLsNYghltTicbNMD4SweGtFXJAYIiCtF7J1OZDCer319pWJocvKbF0Iz6ETRG9tSAydVMQnE18KQRCdtKPfrly/ELNNB7HESSKWVIs4E0MLqlE5CSEKkykiDlPlKGKoDDScjhDCjF6LMEHkcctbRQx53DJWEUIGtFeWEEQdjj6VWILjG9cghDYFIIg2XJ+ymhha0vX3HpvS9YtW7fASQxO2poQmWK8mNT3U5k0MVYkSQlWcyckIIhnZlQXEUIukx4ZqJMsSkUMZP+8YavDb+TNtVTBWTeLdQzlOE0MRQ48ORfiaLzY95CImhlxyHh2yyS27kBxyeBNDIjX/HmUisA7CPVqkF4EYkph5dEjC1V2w6SG2JMQQS8qjQzSpvgPJIaY+xBBDiRSiKI0TRA6hWhFDiBApBAmNGUAOb9WNGK7Q8ReVxjzuKXd9f//37nA4OAOvQAPlaid50ZhyyMaNNTm8VjtieEGFEMY95Hl37uPMl9yI4RcmpJB3tLayyvTwXyWJ4XtPk8JWjnfZPsjhCz9ieITgF6HKjtKWVl8un9/v9/tPW9pTzl6mF8PNzc3D+fxPDjtrNkvA1DC9GHa+p7DZ4122sbnlMLkYvFcoOzxbXz2vHCYWAyls/VjX2d+ccphUDKRQ59DMkmU+OUwoBlKY5TjX3edccphKDD6WrHtU5ss2jxymEoNPIOY7ynV3TAx1eXaRzSNEF2UY/ibmkMMkEwMpDH8eu9rA9uUwgRhIoasztZmb2bYciGEzjWojyxIghmV5V72aaaEqTsmeEdiuHDY8MZCCc7wEgW3KYZNi8PcalzgQrvGFwFZ/TXuTYvB9BYd2WQLbmxo2KAaPEMseCld7IrAtOWxKDKfT6eF4/KBTEVicwNb+FP2mxOARYvHz4IK/ENjO1LAhMXiEcEp7ILANORBDD73kHjZEgBg6KqZpoaNiuJUNvIjcyMRADE5jTwTGnxo2IAZS6OlIuJf/CIwth6HF4N+EcAz7JjCuHIYWg48n+z4W7o4YVugBjxArQHfJBAIj/yvaA08MxJDQo0JXIzDm1DCkGPz25Gpd7sKJBG5u/tidz+fhztlwN/xUF9NCYn8KX5XAeFMDMazaMC4+BwFiWKDOpoUFILtEdQJjyWHAiYEYqveshAsQIIaGkEmhIVypmxMYRw6DTQzE0Lx3XaAhAWJoBJcYGoGVdgECI/2Vp4EmBlJYoHddojmBMaYGYmjeCC6AwM8EiKFiP5gWKsKUanUC/cthkImBGFbvZTdQkQAxFMO8vb19uLv7qziPBAj0QmCEl5ADTAymhV4a2n3UJND31EAMNWstFwLRBIghGtXrgSaGQoCWd0mAGArKQgoF8CztnkC/cuj8UYIYuu9tN1hAgBiS4d3f3z8cDn8mr7MAgVEI9PzpRMcTg2lhlAZ3nyUE+pwaiKGkptYiUEyAGBIRmhgSgQkfkgAxJJSNFBJgCR2eQH9y6PRRghiG73UbSCBADJGwiCESlLBNECCGyDISQyQoYZsgQAwRZSSFCEhCNkegLzl0+I6BGDbX8zYUQYAYApCIIaKLhGyOADEQw+aa2obKCRADMZR3kQwbI3C5fH6/3+8/9bKtzt4xeIzopTHcxxoE+pkaiGGN+rsmAq8SIIYrjWFicGJmJkAMxDBz/9v7FQLEQAwOBwIvCBDDK03hMcJJmZvA6fRxdzweu3jv18VNPLUDMcx9LOz+iUAfUwMx6EcEuiJADM/KYWLoqj/dzEoEiIEYVmo9l+2ZADEQQ8/96d5WIkAMxLBS67lszwSIgRh67k/3tgqBm5s/dufzefUPBVa/gSf6Xjyu0oUu2imB9acGYui0NdzWzASI4Vv1TQwzHwN7f06AGIjBqUDgBQFiIAbHAgFiuNYDHiWcDgR+EFh/Yvg/09ZXJfVzEzwAAAAASUVORK5CYII="
        };
        var tempTeam = {
            id:1000,
            profileImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQYAAAEGCAYAAACHNTs8AAAf4ElEQVR42u1dV1dbZ7rmX/hn5OLMyplzJjczc3G8Zp1yaRvssew4iROTuGLjikMS2+OCwTbF9N57bwYhQCCBeheSKKKDwSaZ6/fsT4lnHE8kBGhv7fI8az1rxaFpf+/7Pfsrb0lIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOSIpJfm1Eu1Tkpvn6HHvQHK7J+lF6/mKPs9sn8/G5iljL4A3ev00Y1GD31aYiWMHnCG84MbTZ6QXzD/YH7yW/7D/Opxrz/kZ8zfmN9h9EQGZpi84Xlqml4m7cwW+dd+YpM8aiZfSCHj/Bvqsq5R8egCpbV6IRIKwl3O3szuzP7MD5IvpuzJf5i/Mb9j/pfL+eFFzh8xqnFbGZiymHIPOTfIPru2J0PuxiNJfyWdf5uqJhcpudIOI8sQzK7MvszOsfQdxsDG30N+yfwTKwmBcKzAdqiIU3fX8o8xN2g4keixrkMgZCQIvbZ1QXyH0bW8Q0WaBfgOn3jU4ye1ziqYUT9ki2GFEnNNKlhCemB2a+XsFy/fsc+u0sNuPwQi1qsEjXszbkZ9n86lHbrR6IKBJYRbzW7yrvwoCv8ZdKzDd2KBB12+0HJeDEZ9n1XaILd/NGL/KOpzKGNq1cSi6HyHHW7e75qBQOwHR/KMH1VoxWfU96l2bdAXZTYYWIT4vNTG2WdT1P5Tyb1cjuZZDsNaUeJkgdnbalwVtVH/sXcMvqVLNQ6Ig4hwudZJ1uCOJPynzbhCJwpMGlhtF5wqslCvdV0SRn1Hx+Jbut2Ecwcx4HazR7Abq1ixx7JCpwrN8J9Ie0Ihr5Jieii5+Iau1SGwJZ642SQ9UXjHbvMKfCccem1rkjTqO9oW3tClasQ7xGv74FjakbT/QBx+A/X6ZUkb9R11vk36tBjLQiHB8humAm9k4T81EwiG+gcedvtkYdR3bJlahHEFBDvAk5P/PGjHeVUoRDWnqFJWhmV80oNELCHwtM8vO9+xzy7RuXKLsv1n0LEhO8OGDiODW/R5CbYUfOJsmS2UiyBH/+m3LivXd7IGArI06ju2G4IQBh7RZVmTtf9kKHHVeaaYHRhty9qwjFdrLRAHHnCj0S1739HNbNCpQoOy/IflqsvdsIyjzmUIAw8Yn3mtCP951qegVcOpYgtN+LYUYVjG67U4a4glWLakUnxnzL1GJ19OexVh2LRWj2IMy9iim4MwxBDtphXF+M6RxBN0q0EhiXod5lVFCYNv5S19WWyEOMQAyZUOCmz8pCj/adUrIOjpbLmd7Is7ijIsY2Y3glZicjY1OKc437HOvabPi2R+CMnKbSvNsIztU/MQhhigW+ZXlOF4p0Hmt1u1uiVFGtYY2KBPC6YgDgcAK4pjDb5VpP+Uj8i84tOIZ1ORhlXrTJRag9uJg91GeCinuFKR/jNklXGwHKtUI9cQ1mj4qB2Vng6CzP6AYn3HPrdBidl6lSwN+2mxRbGGZXw54IYwHAC/9GdQJJMvXKITOePyLAHHKuwoWRjqx9FX4CBoNqwq2n9SKvTy9J8nMkyR3Qt7jCjCsV+wasoDMs3EjZYPWmV6M5Gvnle0YUfsS5SUPYleFPsAqxw+7n2taP/J7pZp2cDi0aCiDTvmWub2iVqUCt8HThdbSeffUrT/5PVCGCAMMcbxfHNdSr2L7nf56NnALBVqglTC2aNcu0hVE0v/Qvb/2dfZ97HvZz/Hfp79HggDhAHCIFFh+KzUSlnchG6YXiG2NzfNvyH77MGiBtnPs9/Dfh/7vez3s78DYYAwHOyMYVjZZwxqW5CSnmt5O2Ngpc7Kx4M06d8WrCs4E4tJ3xaVjQXpLI/t+nDGkEAvumR6+PikV9m3Et0GftKv2ZvbsiCOUGHj3Bv6JRAppmC9TPvt64r2n/uNMk2kUkI5rkisHY1tNZ5ykTf9LR+PbRn9pqkVRfvP5RKtPIWBRT6KsaW9UMztPXhIdNJLc2rRqLQiAFnEIvvcB332ohHlRj6m33tISZnqLFkKAzvRdi4pN1fiQbNp38LAAnzYVkyqvRldnN3Z5z9I2/eMPuXmStgC63Qsc/KQbO+j1W5lZlfa/UG6Uj65L2G42eSmIZc8xm3IuUHsefY7Do2dg4r0nwHjrLyjZqsnlVmPYXpmlU4+1+ypqCdbfhdz24bGzgFZjUVjxwAVc9uLxFyTai/j8XmplSzzyqzHUDIg88zcu61eRRq2ecK3J8OyYCK5X8+NejYppc65p3HpMiuzglPqPlebkgGrwmMLKu+c4XFL9MVg73f6yLf6oyLGZYZ7znsd0d/WPB+YVZzvmAOrdCpbI/8EPLl1J96N3sUt+jRbHZVhc4fmFPlGzHkV3R76qwo7+deUVSW6YcyjjKzcOy3KqstQPxrdYVuFyOMS+I97iK58WatBOS+W5POXuG2EVhnCcLLI7B3zKCe89ULhyK6GrVHooeyHrJrYXRxSG12KGY9h6zwdzRo+nKAUKGWvOGzePQy6Qb8MUXiPdZO7R0yOKqSo8JMWhTW1PVVkCSXfyN2w5/KGIhq2YQqi8JvbL11kcfjlNkPe2biORTqaMXg4QWnIkHlSVYMmcvcpbB922VaMR27SI/dD7HsNekpQKnpt8ryXtgbWKPFJvyrcc794NYvJHwWf94WP/zhTbCX74htZPneHzqdcUfg5roEz7qz8lD+9NvxJ8rdtXsopqsDEj6pRj5nSmsPf6jzs9snumf3LW3Qyq9+boHR83yGvfpbV6vDhqxdrnORc+hGTfi95JsE3dL4qfBGYpml5ndPcKlVTAvAzqrTyKPumsS2E3UKwA1eN5zUm+35WDq51UhUad35rXE8XW0grk/Dxon4L/fu1ZlQSfx/tEj9Mmvau0Bc5r8KqffHoAib5AVgwHL4y1IVqB5nmt6WdXDbmpj/dblFBCT7A0TzD4TaDNJeFJt8qnXs5HNZxrze4KLD+Eyb4AehbeUspteELol6td5JVouLARAEKEAEnCoyadomJAxOFC4WR94UahXb5jjWH7CsRx/kaE4cFaYlD07gHohANkl4aU+t10jhz0LmX6PSz/oiGzRwIYFLHkBndkSdScqWNpgPSOHOoHEYH9D2jUC3uTMMu/e53zScLTF7PKm4hYkn34jYdz5uui7zyNGn6rOI+s8rtMkEU9ou7zS7KKSwTnVHzuqKrr1A9uYjJzANL1TNRjX/JiPgCyRrbe+laCa4kY4IBqzgmmG1unc7lDNAnt9p2jWE/U6Lsqth8Mv3+QzqdPx3V5LpSYyVHUBx5Ob0GP/0xtRaiEEt83+Ykx0J8DMzKd5e/ctB/p3d8FO3nrdUhF4JPVoxEHzbMGtZUj89R8oUr8QnSmt+gO5Vj9Mn1xjrMZJ7wos9DxoAwp/y+pa1QoRVVZt/Ox9eiFwVVoXnHreBS+YJMNu4lcTxXv6eJ9kXRNDXr5sm/KkxRWRbbktlmoP/9oe0QZq4AOPJM99GjThe1GxbIFYztCTQr9T5omqW8bgsnCAN7EoR3eDaAJCkh+LTbta9l+WeFU1Qw5KNh2zKpJ00x/UxObnXQovXQ/YYpbBniiS+Lp+lRp5NKhrzUb5onB2eYvRgysLJNo/YFqhp2UEbLNF0sHjuwQYeciFsQggPWpQPb6mq1mbJ6XFQz6qNRx2LIH/byGRzz69RnCFBhryUkBp/l4GAxIs5XO+ilep6aDSvUYV6jVuMqPR+ci0m7st2E4mqVie7UGulu7RSl1+opvUZL31aNhXi3cpTSKsfpdtUEXS3TUnKhNqbls1jpd//a3zFxhchE5LYEKdzEjpXtkrInU8+XG+l6jZHS6gyc/zDfmaRvq8d/5T93qrR0q3KCLpdq6bO8UV6FgM0XNm/Y/GHziM0nNq/Y/JKUIJwpsXIPsRJ2crCOyDmv5mSrqtmv5jBphazZ0CvfcGJWNdw4/9s1J1i1bDbP2HwT/YOwNmKOxegOdszcA9/rlFdBCtab8ZVzAxNWQPabl2QnDGxeWBaiK0JjDb6ly7VO8Y7BNW4JvZ92asa5bfq6yi4L47IsPxduIwSlY+E1fV0qj6Kp33DzwDS/96pUjR39dLVOhOIQCv1dOVjoL2t4e0nMyhcFWHUmTFZheSTxBN2qt0jab5jfjxyw4bN7aZtO5Bs1onqwoRgun9kApbV66USBRSM1A+cOzWOyxoHPelySEwbm38zPY5l5O2hdFs84ZPPUVs2y8JbY4cuVOmkYnUXXdVvXMFHjUTx1SjqH2cyfc4fnQv7Ny2Fsvzf+Y3GywOx1L/ObPZj+4An12NbpSW+AzpbbROsAnxZbSR/YxkSNAyfcK6TK0++I1Te+LLfTk75AyI+ZP/M5Fs7g1q7Zp7yjUCNsuTL74g51mFfpKTfILLVWqJsW1ley07xG7L/DfV9ypZ3cK0ixjgedC5t0tjh8UtXNJk/IfsyOkWwY262CScP8tJPzV8eisAfSeYNxXDWw4qbRXqnwwZm1n2jcu0UsWel2c+yq4LClXslokIZdm2QL/nq5d68l/IrlMvdzfL8NwDAH1xNG+qZ0OkKZ+V83N2J2ZdGpBSMLMd2qMj9k/sj8ciaOXbl1M+uUmK1XxUUYxFjTf2b1Rxqf2aIWwwpl9geIddb+0PAs1iC1wR36WhG34mkzrtIUtwXw7vK2zykspdRKPUVaWWCSxo9XK8MLA7N18sWUiD/P7D/l3w5FGLKVMPsZ5ifMX97/XSziMI37Wlb/bMjPxmZek1eExXh+aItTZCQbQCU5nt0X5JwvfGIMbiTifDPR7Ygo2vuJsZEym3TzwgtDcqUj6ghHudAV3KRvSiZRHl6kzO8PHwNzudbFvdWVVaXbNv+aviwROPDrfpdPcY5nm9ugr4p0YQe6UosybvFkyavwh4rnqxzkVGBE6vctAkcUV00orzqRzrNCquyxsFdibL+JCRo/1o+FrwP5WYmVDHNvFDcmZSMC5iKpisw7Y17ltVrTeVdJlTsBYYAwSIYjjuU9V7naN1iikBLv6yEMEAbpxXe8pmShEszutCgzUQjCAGGQIq/XmoURhsKRBQgDhAHCIBHm9gtUyKbTosxEIdvcJp0rCR9EU4LryvheV/aFP4H/pspBDoXWyWjVCZBgdjLf7J30bSlygFk16vNl4QOcCjUIcIon83rtiGP4DY45lygpW89rndWEz0tt5FxSZqKQd2mLLpaHXzFk9KF5bTz5oDl8L0hWoNe3pkxhsM9t0Ol8Pb+rhq+5JZlSE4WSz1+iW3XhnS+1EbkS8eSl0omwtrnbqtzKWo3tPXS2iGdhuPVzFqNi+X1z+Iq8F2uciovHFwv9K1t0rlAb1jZ/+yC7Umm8WjXNrzBkDih7uZzZGT5R58tyW6heBCaq8LQEVulM3nhY27xQeEn/R+08l5ivnFB2PkDtuD/sALN+leMzrzFR4xHhZ1ugpOfasAdsjVPLyCPh9arSvKroAR60BOlotj5s16pWwyomahzYMBa+YlHSS1OW2qXsloGRYjxigkGHspupWGY36POiCDcTvX5M1DjwfpMhwhbPTragsrd4vUaeYxl0fmUXO2VVnC5XGinS4WxOcSUmq5Bl3SaNlFIevk4Ga4SUfCFF0WOkdfLYretYge3QfrrkyO8gJ3wgzVcVdrLMv8WEFZCGGXbwGL5D+VPEl9C0l8d+E4m5JpVSo8feZ4tuNuIgtxlxziDoPf145P0z6xCt9DFyLWzwJwysHbdaZ8UbyrdOSbn6LERAiiXiMfzWjvU9MWOVS96l1/wJw/F8cx0c8WfeqAvfK/FrVq9iGf0lhAr3/SJPE9YWt1s8GCeO6fce8icMv/SSxECzklnqyA09OkzYTgjBZm3kbUS9bhnj9AuPZQ4e4kUYoL7/pJHbTkQaqx86ZzBOAjCteiKiHfjqDylFXovQ+uBAUGJl6Ei8uUtlHOMs+ljySZ0n8kl7WosX4/T+dqLeAGEQgk3aQMSBzuGpCzj4Mx+3RH4DdllwGwFhiEtG35uIA30kz/jRh70vwdjQ7F/bdeztsxAGQYThaT+u4T5k8XDkwy+MGU8h0PWTEce9fDyIcfqAf2vhqShsvhqly/71fnh7167COv8WxiqGHHMEIzp4UoEpS6nVmiLxWZcVwiAkXw5EvrpMqXNinGJZSSvvVcTxLhzBauG3+BzCIHCQzfwWncqPXCGn1YjS8rFgjTpya/fTJVZyIbgMwiAW5g9FPms4VWwh6wJCcw9Ck2+Vjmb0Ho40zkUo4Q9hEBOdi9uUXB75cOdRN251DsLvaiMfOH4TCkVHaT0Ig8hYrd29GEbTFEJ097WFGHHtOra1uiWMVTyEIW8YATuRGFh9S7ebnJG3FEUWGnJuYLz2wD7DLLeFGIy4hUhr9RLiFna5lei0II4hXuy3rlBSrjFi15+vKmxkCOAKM9qw59PPI99CsJqOryC2u8cxNPMU4HSzGQ1VomHOoH9XA1xvcFFgHafnkehjnb8K1LT7ShZb3Gh4pVTLjzCwk3XUM/wgNDewRkOWOSoftFF2h4GuFA5FPfh/Q4h5RH5bPR7VWB7PN9XdqDVRTpcpZIdhzh7MLhjDf5LVxUx8OqxK4AtKrvlo4/aw5YNW+vJFL/1fenNMmoQ+6EAG4G8xrWI0Zm+35Dw1lb+yk31uXbHjOeXhseYjg9Iy1tiA3qnQ0B+uVNLHKY0aPsb0Ma4xf30tWTNOH9/u+IgvH/62RkdTXmXdDrVqPfwKw0MFOLF9foPyesz0X7cbNb+/1liXIACedM/QkcQTyg51Pn+JfqiboAQBUTDgIkdQ/gfB6bU6fsf1dLGFjHPy3E6orfOUVq2lP6e1HU6IAx50zpBnWZlp2q6FTfq2RksJccJ3zTbSOOVZjk/PrXp5PV94h8IReZ0CD5pm6XZl/JzyVzc/jS6aDiir/6XOvUyXi0ZEMf7pzQ4adshLIF50moQZ289KrDThk77zsn1mes2EKBzyfZyrsNKgXRnFZPumA3T6+aCobHAs03boUaeHDAHp97sctQfpeNZgnWCD9307izSTrvMW9VroREafJkGkYEE7hWp5B5TldBopQcT4vNhEFaPSjfb1L2/HZyUsxS2FdXaNbpQd/CrsZJHZe7/TR5XaReqzrZN2Zov0ge3Q+Yt54W2IrM9n6egCJb007vtq80KVjab967Lb837xvI/2L5rGVDaubHzfjTUbdzb+zA7MHswu9zj7nCwweQ+8vWh1k2NReoV9WVxH3FS1ekI6aa5qyzypnvbu7PdZf+iYIRZ6u9fqQJ7VHXrc6z+QkQrV8rgNyu0y0l++2//h7uPeAHlX9xYxyuzF7PZ9x/5bwZ8ts9KYWzoCXTJooz/yeOUbFfKHxN/6vX1yhv6S3rLnk9lTRWbqt8fGIdSuTfqsdP8ZbmcKDTTqkmbBlxHbPCU97Er9ferebRBa1nPjNuKOzZ6f2VNVZNrXC6LbJP4Mzhft07zF3OwZaU1OcgTFudwqf2WjT67vLR6BvV3MPDQrSX/whJ4ccPVwp8FKep803l6T7iVKLdXQf17bv6Nm9Pl5aWNvnn9L37fvfRVRoxXnFto+ux4a63+/Fpuo3JjhRL5B06BbILXOJJrByu400cdXoxOFYwW2Q2xfOi1Ao5gh5yYlVzoOJBDpTVbqsyyRetIkLgf1L1L3lD908PWH6/sPEPu6ykFDLv5vBpi973EvAmb/6Ld2s+JJ91/ZppoRp6gPckO4WmujJv0CuZfiu4J41m6gT25Ft59NbXDRgEPYt3Bj5wCxA9xfmgXvG5cqTVSs9tGIY/ld81LhI+u4v8uSlwp6rfRN4Sj9R+r+zxFYj9RCzQI3PoOCPsMAt8W4Vu+KeoLlDcVXHNzBTaofddPFQo34ReF9nK8wU1avh4YsQdGeyLLGJKwyVWD97/Hbf3N755tN7gMb91jm5KHrdTZ62umkdn2A3Av8vm1dCxuhGPyHjTpKKRmLiXPebPaQxhO/GBn/2k/0cniOmF9Et3IQ/jpz0BSgJ016+ipPLS1B+BBHs/WHL1SaKa3eRGVDrlBfgMAKf/HpRX3RHfB9VW4nsRT4YDEhrElKYq5JFatxP1tioJQqI92tM1DpoJ17o8+Th3vLHEk8vqfPxr7fyYkAWxEU91voVvkIXSgcoTM5sYtWTHppTq3QLoqmCtMrbvX4Jecf0Xz2ijH+bub83Dxh86VkwEo3yzR07qXExWBXR3gxkaXKHt05+eyVV5U5sHMyo8d74lGn5qA8+rDt8J9/aNt1r3ilziXKnI9J31ZMVg/hkJg9oUp6MZqlejGyczJr0Hsys9+ryujZ+XAcjz9qrzuR0as5kdGvYWXVeGuhzlYJ3POKsSkPa0p8qSa6c6DT+VOketq/EwsfZmN/PKOXY1/dkSdDHyUAwiC1wU3uFXFXT2oxrJASbNFmFHf0rGvpLaXWOwmzRua4UOMkx6I0SowfSforZfQFZOmUT7nnYs8nBTvYg2/ofJUN4iBXJFfayTQvvbRm59IOPerx7+k6TYxgn59FLjqXpFfr0ji7RV+VQxxkB1WheUftlna2HBOI7KE5YgInNUHO4T63U+LNYIYcq3Qy/+C5F4CI8MueXR5ZicWV1G5apQddvqhPzoUG+1zs83WY1mRVQLhpahGrBrlAzo1y7MG31MyJHjuL+KIsvktd9vfZ52Cfh30uuY55zoAf4iB13Gr2KKYSEtu7s7iMsvFF+uW5BRlf9vfY33UtKaNPBqvNeaPBAXGQKljNBMuCMmsoMs6s/URTgW1qN6/S84FZOnfAswl2VsB+T4d5LfR7Z/aYfi4nmmY3ieUGYZZJEFUTiyjHHi7xZv0nsizshG5pRjyvqc20+g+yf7P/z77Ovg/jFSZrdzSAVYPUcKPJQ+n3n8CBQf6S4Dr6KbXeDnGQCth9eZ99Hc4L8s4e8xKEQSq43+WTTFQdKPEmOReu0A9tLoiD2MGy9AYdaIkOCsd+yzIl5hpUmH0ixgN0kAbjcH15r92NVYNYcTTPcnjYtQlnBYWv32Bdjrq4CyAwlBTMBIpv1cCqZ2EWihD9DtxEgPFjrykIYRAbWN+B5IspcFAwbmQFcU8XTEMcxIRa3RKcE4w7q0Z9EAYxgdUqgGOC8aZ9bhPCIBbc75yBU4Li2VI0WiEOYgACmkBRHUIa5yEM8cbJIpNX6I5FIBhxOxFYpOPZE3WYnXFE1sAsnBEUHR93IOsyrui2rMERQdGxXT8LYYgXWAi0a+VHOCIoOjoWcDsRN9xp8cIJQdHyRq0J4hAPlI4F4YCgaFkw6IEwxANqZFKCIuaABT0oBEdyhZ3cyzhfAMV8zvCazhYhd0JQfNeGaEdQ/KnYaQ0WCIOQyBueh/OBomd2H+pBCooO8yocDxQ9W/RzEAah8GmxhaYCW3A8UPSc9KyQKk+3g1krAC7XOmlmFQePoPjpXtymC+UGrBqEwN02L/pGgBLpO3GZbtebIQxCgLVah9OBUuHDNiRUCYLqSZRxA6XD8pEZCAPfSMw1qQZQmAWUEHtMC3Qsc/IQZi+P+KzUSobZN3A4UDLUe1fpVP4UVg184ptqB3lxIwFK6mZii86V4GaCV6Q2uOFsoLRCo48dp8uVEAZe8UMHmtaC0uOdeiOEgU8UaRbgaKDk+LzbAWHgE/X6ZTgaKDlWaXBlyRuOFdgOoYcEKEV2TSOZijewGIZR72s4Gig5DlnRCZs3nCgwaUzziGEApcdp3yolZU+mYhbzAFWRece2+BaOBkqOJj8nDC8msjCLecDnpTayz6LBDCg9+pe3SJWrRV0GPvAFJwyNnQNwNFByVE8Y6FTuOM4Z+MBXFXY4GShZnsmDMPCCc5UQBlDCwpA7BmHgA9+1oyUdKF3erkG+BC/I7EflJlC6fNSKHhO8IGtgFg4GSpaPIQwQBhCEMAiEYmRWghJmdjeKwvKCCu0iHAyULIsGnRAGCAMIfiAMAxAGCAMIQhggDCAIYYAwgCCEAcIAghAG0aJ8PAgHAyXLwn4UhOUFBep5OBgoWb7otkIY+AC6XINS5oNm9JbgBTeb0IUKlC6vlE1AGPjA2TIbpT94AicDJcfG9h5SPVejtBsfOFVkIefSDhwNlByts2uU9HwEVaL5QNJLc6rWh74SoPSosS1gG8EnWowrcDRQcqwf9UAY+MRT3EyAUryRaEJZN15xpdaFEvKgpBhY2aKvi7QQBl4PIIstpPVtweFA6Zwv2IM4eBQCJaMIjQalw5e9NqwWhMD1RjfZZ1fhdKDo6Vveossl2EYIgmMFtkN9NvSwBMXPTr0foiAk7nf54Hig6PltjR7CIDTUrk04HyhaDhjnIArxwO1mDxwQFC1TitGrMm6o1aGqEyg+lg856ONrHR9hhsYJJwosmknkT4Ai4pgjiJWCGJBcaaeZlR/hlGDc6Qlu0uln/RAGsSC9zUs5ReVwTjBu9C9v0fVSDURBbLjX4aUjiSfgpKDgTL/3kG5X4rBRtLjPiUPyhStwVlBQUUiDKIgf37a6Sa0zw2lBATInt+l6GbYPksG1egeZ5pCFCfJHw8wKXSgYhihI7iozz6Bp1iMTE4w96zQuCILkbyxanKRxIekKPDiHzHN0q0JLn9xG8JIskJhrUD3u8tCIEzUjwb3zlWmO7tXrsEqQK5Jyp1Nv1duoVT9LOYWlcHowYi+IxjE3XS0egSAo6gwiV6+5UTVN3VN+iAT4sxh09FCn3kcphUMQA+CfuMntHxs0bjLMrJLdjwQtOZPZl90sNGhcdL1UTf9zt7HuT7dbVJgFQFT4OKVR8/GVup3fXaykfztfBkqcv7tYTSGbXm3OgncDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8cf/AycwtmwR5ea6AAAAAElFTkSuQmCC",
            users: []
        };

        $scope.selectUser = function(index) {
            $scope.tempUser = angular.copy(index == -1 ? tempUser : dataService.users[index]);
            $scope.userIndex = index;
        };
        $scope.selectTeam = function(index) {
            $scope.tempTeam = angular.copy(index == -1 ? tempTeam : dataService.teams[index]);
            $scope.teamIndex = index;
        };

        $scope.selectUser(-1);
        $scope.selectTeam(-1);
        $scope.teamSelected = false;

        $scope.canSaveUser = function() {
            var userIsEdited = $scope.userIndex == -1 ?
                (
                    $scope.tempUser.fName.length != 0 ||
                    $scope.tempUser.lName.length != 0 ||
                    $scope.tempUser.email.length != 0
                ) :
                angular.toJson($scope.tempUser) != angular.toJson(dataService.users[$scope.userIndex]);
            return (
                !angular.isDefined($scope.tempUser.fName) ||
                !angular.isDefined($scope.tempUser.lName) ||
                !angular.isDefined($scope.tempUser.email) ||
                !angular.isDefined($scope.tempUser.profileImg) ||
                ( !userIsEdited)
            )
        };
        $scope.canSaveTeam = function() {
            var returnVal = angular.isDefined($scope.tempTeam.name);
            if ($scope.teamIndex != -1 && returnVal) {
                var a = $scope.tempTeam.users.sort().toString();
                var b = dataService.teams[$scope.teamIndex].users.sort().toString();
                returnVal = $scope.tempTeam.name != dataService.teams[$scope.teamIndex].name || a != b;
            }
            return !returnVal
        };

        $scope.addToTeam = function(id) {
            var indexInArray = $scope.tempTeam.users.indexOf(id);
            indexInArray == -1 ?
                $scope.tempTeam.users.push(id) :
                $scope.tempTeam.users.splice(indexInArray,1);
        };

        $scope.saveUser = function() {
            if ($scope.userIndex == -1) {
                dataService.users.push(angular.copy($scope.tempUser));
                $scope.tempUser = angular.copy(tempUser);
            }
            else {
                dataService.users[$scope.userIndex] = angular.copy($scope.tempUser);
            }
        };
        $scope.saveTeam = function() {
            if ($scope.teamIndex == -1) {
                dataService.teams.push(angular.copy($scope.tempTeam));
                $scope.tempTeam = angular.copy(tempTeam);
            }
            else {
                dataService.teams[$scope.teamIndex] = angular.copy($scope.tempTeam);
            }
        };

        $scope.deleteUser = function() {
            dataService.deleteItem("users",$scope.userIndex);
            $scope.selectUser(-1);
        };
        $scope.deleteTeam = function() {
            dataService.deleteItem("teams",$scope.teamIndex);
            $scope.selectTeam(-1);
        };
    }
]);