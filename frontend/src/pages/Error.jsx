import React from 'react'
import styled from 'styled-components'
import { Button } from '../styles/button'
import { NavLink } from 'react-router-dom'


const Error = () => {
  return (
  <>
  <Wrapper>
    
    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExMVFhUXFRoYFhgYGBUXGBgXGBYYFxYaGBcaICggGB4lHhYXITEhJSktLi4uGB8zODMsNygtLisBCgoKDg0OGhAQGi8lHyUtLSstLS0tLS0tLi0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xABHEAABAwEFBAcFBAgEBQUAAAABAAIDEQQFEiExBkFRYQcTInGBkaEycrHB0SNCUvAUM2KCorLC4SRDktIWc3SD8RVEU1Rj/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAMEAQIFBgf/xAA3EQACAgEDAgQEBQMDBAMAAAAAAQIDEQQSMQUhE0FRYSIycZEUgaGx0RVCwSPh8CQzUvEGNEP/2gAMAwEAAhEDEQA/AO4oAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIDw+QDXwAzPkEB56w/gd/D9UB6ZKDlv4HI/nmgPaAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIDGJRiogMiAIAgCAIAgCAIAgCA8yOoCfzXcEB5ijpmcydT+dyAjY9o7OZOqDjXFgBwuwF/4Q+lKrTxI5wXJaG9Q3tdsZ5WceuOSTljxciNDvBW5TEL6iu/Q94ND6oD2gCAIAgCAIAgCAIAgCAIAgCAIAgCAIDxM6gJQGrZhVyA23PA1KAMeDogPSAIAgCA+OKAxxyEn2SEBlQBAY5tB3j4hAZEBXbVd5ktLIQAyzxhs9GtAxSB7sqjTcdFG03LHkdGu6MKHZzN5j3fCx/xFiUhzjFDq7hiy8gD6goDKgCAIAgCAIAgCAIAgCAIAgCAIAgCAIDzIyoogDGAaIDAbOSakoDYY2gogPqAIAgCAICE2h2rslijc+aZlQDSMOaZHng1la+Og3kLKRhtI43enS5eEjyYurgZXstDQ91P2nP1PcAt9qI97J/YfpZkfMyC3BlHkNbM0YcLjk0SN0oTliFKZVFKkYcTMZ+p12bQrQkDZBpX+/dxQHkWZmPrMIxluEupnhBqBXhUrGPM23y27c9uce59kk3DN3w5lZNT1Gygp+TxKA9IAgPhNEBqGQuNAgNxAEAQBAEAQBAEAQBAeXvDQSSAAKknIADUlByc+m6VoA9wEEjmhxDXBzRiAORodK6qLxUdOPS7Gs7kb1h6RoZG4uomaN1erz7u0tXfEmj0W6SypL9f4N1u3Fn1McwHNrf8Adms+PE0fRr84TT/Mkrn2ghtJc2PFVoqcQpkTTit4WKXBV1Whu0yTs8/ckH2lo59y2yVlXJmP9M5eqxk38H3Na8L8hgYZJnBjRvOdTwAGbjyAqjklyZjp5yeI9yiXr0puLsFkgB4Olqa90bTp+94KKV3odGnpWfnf5L+TSZtZeTs3TsZ+yyOM+rg6nqonfLyOnX0Wn+79zZbtZbaU66vPBHX0bRa+PMn/AKRpF3cf1Z7ZtXbG6yjuLGV8gAVnxprlmj6VpJdox/Vlf6Q9t7RLZm2cEMc99XujLml0bQatOeQLi2uedKUoVaom55yjhdV0dWl27JZb8jl7WNGQHlQKycUmbj2ZtNrqYY+yDQvc4NYDrStKk57gfVRzthDkmronZ8qLVJ0ZPbZnuModaBm1jf1ZaBmypFS4555DdTeq34tbsY7Fl6F7M57nT9i70tDbLG22j7YClQcRw/d6z9umtKpLUwz2Mx0lm3LJ6O8o3kNIOfECiR1EG8CWmnFZNvqRz83fVTlc9BoAyoAgISXbG72/+7gPuvD/AOWq13x9SwtJe/7GY/8AjWxEVbIXDdRknzAWjugvMsw6VqprKj+qMEu3FnGjJT4NHxcsO+JNDot8nhtL8yTuG+G2tjntYWhr8NHUP3Qa5d63hNTWUU9Zo5aWahJ5ys9iUAAW5UPqAIAgCAIAUAQBAEAQHNelXaag/QonZkAzng05iPxyJ5UG8qG2fkjrdO0uX4svy/k5vYbN1jqbtSeA+qrt4O9XDfLBZoyWgAEgDIAE6KPLL/hx9ASsGySRaNg/am91nxd9FYo8zida4h+Zb1YOEal7XiyzxOmkNGtHiScg0cyclhvHc2hBzkoo4vfd7y2yXrJCSa0YxvssB0aK7+J3+VK8pZ7ncppjWtsSSu+yCMbsR1OvhmonLJ1K6VFe5t4+Q9VjJvs92fH2jCKkho0rk3PhXenc1cYJ9392a8lqYGucCDhaXZEZ0FVmMW3gWXRhBy9Fk57arU+V5e81O7lwAXVjFRWEfPb9RO+bnNmW67rmtD+rhjL376aNHFxOTR3pKcYrLNIVym8RR2bY6CKzwMsgmjfLGHGQNcCQ5zi52WtATStNwXLublLdjsdnTqMI7M9yTtdvwPjZ1b34/vNwYWDcXYnA0PIFRqGU2SueGlgw3X15kkMskT4qERtjriBxHORxrU0oDSmYK2exLh5NF4jfKwSFFGTFiuy0Y2Z6jI/IroUz3ROTfXsmVvpOv39GspjaaST1Y3iGf5jvI4e9w4LayWEWNBR4luXwu/8ABxqy2fG4N4+g39yqt4PSQhulgtLDhAAoABQZD46qPJ0PDiCVg3SS4Lz0bSdmZvBzXeYI/pVvT8M8z1+P+pB+z/cuasHACAIAgCAIDxLoe5AasMxHcgN1AEBA7Z7QtsVnL8jK7sxN4upqR+Fup8BvWk5bUWdLp3dPb5eZwiQvkeXOcXPe6pOrnOccyfFVcnpoxSSiixWCxdW2goTqaEEkqN5Zfr2wWDMtScIZLZsG39cfcH8ysUeZwOsv4oL6lsVg4pzHpRvQvmbZm+zGA5/DG4ZV7mn+NQ2PyOnoasRc/Urdx2eri8/dyHef7fFQyZ2NPDLyTSjLxNbL3QLRL269W2mKmVSdG13c1LVDc+5zOpax0V4h8zOkTWGHqjE6Nhiw0LMILae7oruFjB492zct7bz6nB+k26Y7FP1bHVErMbWVJMQJIoScyMjQ8jwz1jV8WfIuW9RcqXB/M+35epRnHcrJyDp/Q7TqbRln1ranlgyHgQ4+K5+s5R1On/LIvogaHY8683OI/wBJNBpwVTc8YL21ZyasVnZI2Mur9lIS0hzgOwXMaThIxDDuNQtstPt5mmE138ik9EV/wNntMcxa0zyCVhdQB5q/G2pyxUe0gb6FdSUcpZONGeJPD8zpd52uyNLWtmiEj3UazG3E7KpAbWtVUupSjlIvae+TltkxYrQWOrXI5HuVeqzZItX174+5yfbW+XWq1yOBOFh6uMHI4Wkgmm4k1PiBuVictzL+kp8KpLzfdmO5LPhBedXZDur8z8FDN+R1dPHatz8yUWhcCAt/Rw/7WVvFjT5OP+5WdPyzz/X18EH7svytHmQgIa6r/bPaJYWtyj+9X2iHYXZbhWlOK0jPc2i7qNFKmmFkn83l6EytykEAQBAacsJGmiAz2Z1W9yAWu0siY6R7g1jWlzidAAKkozMYuTwuTgW1V/Pt1odKahg7MbPwsByrzOp8twVSUtzPTabTqmG3z8xc1jp9o7U+z3cVFJ+R1NPV/cyVWhbPMNpDi4ahppXfpnQ8tM66Lb6kKWW9vb9jL2eB8x9FjsbYn7Fu2F9iU/tNHofqrFHDOD1ftZFe3+S0Kc5Bwa/rWZbTNIT7Ur6e6HEN/hAVZ8nepjtrivYlbmjAiGoJqeO+nhkAopYydKlSjDsbuEfiH8X0WMEu6X/iX3ZKzhtmad7yXHzoPQBW6liJ5jqVjnqH7dizROxsLd9KfQqZHHsjhnEenC7pG2tlpIPVyRNj917C6rSd9Q6o40PBSRZXmvM5utzQ6r0QWYizzSH70oaO5jAa+byPBc/WP4kjq6BfC2Xa1QF1ML3NINajfyI0IVPJewaO1V4iz2SaWtCGEN5vd2WDzIUlMd00iK+ahW2cCAGi7BwT3ZpTG5r4zRzHBzTTRzTUeoWGsrDMpuLyj9CXTb22iGOZukjA6nAnUd4NR4LjTjtk0egrmpxUkc+6TrpfC79LiNGPIbKMqB+jXcg7Q8wN7lb07jNbZclfUXXU/FW+xWrltj5ZWvmma1kebWlzWAupQUaKacSpbYqMcRXJv0+2WovU77O0fJvH6FwMwqGkCpBIplpTw38FRPWYw8Rf+T32efp8U7G3x+xYtgZaWqnGNw9Wn5Kah/EcjrVf/Tp+6/ydIVw8oEBHXVc0UBkcwdqRxc4k11JIA4AVWqilwT3amy2MYzfZcEitiAIAgCAIAgOTdKW1HWP/AEOI9hh+2I+88aM7m7+fuqC2Wex2unabavFl+RSbuspkdn7A14dygk8I7dUN8u5YgojoGjetswNwt9p2nIcVtFZIL7dqwuTxcYOA1/F8gkzGm+VkitSyXTYUfZSH/wDT+hv1Vqj5TznWH/rL6f5LHIaAngD8FMclH56a/KqqnouOxZ7CPs2e6PgonydOr5EZ1gkL3Fe0NlsUUkrqDqxQDNzjStGjefhvV+qLcVg8Xr7FC6bfqznN/bZWm0uOF7oo9zGOLTT9twoXHlpy3q1GCRxbb5TfsQ4vOfC5nWyFjwWvYXOc1wPFpqPFbNIiUmiBtthoMTAaAVdTOg48gtX2N1JyZbOjvaqKBjrNO7qwX445PugkAOa/gMq10zNaZKnqqJT+KJ0tHqY1/DLgv17X2LPZ32gtD2tAILTQOxEBtHUIzqNFRrrlKW1nRtthGDmmci2o2qmtzhjAZG01ZG0kgGlKucfadqK0GR01r1KqY18HFu1EreeCEaKkAAkk0AGZJOQAG88gpSAn7DsVb5aUs7mjjIWx+bXdr0UUr615liOltl5HTthrnnsdnMMzmHtlzAwuOEO9oEkDfU/vFUNRZGcsxOnpqpVxxInLdZGTRvikFWPaWuHI/PmoYycXlE84qSwz893jZeqlkiJr1cjmE8cLi2vouzF5SZ5+cdsmi13TanOfHi/+MN8mZ+q51iXfB7jRzk1Dd6L9ifUJ1Ca2OkpbIuZcPNjlLS/jRzerRzpJe2P3Opq8eLCAIAgCAIDUvS3ss8TpZD2WjxJJoAOZJAWJPCySU1StmoR5ZXri2mtFqlo2ztEVe06ruyPepQnlT6qKFkpPjsdPV9Pp09eXZ8Xpg9dIG0wscGFh+3kqI/2R955HLdzI3VW9ktqKmi03jT78Ln+DiUbS5wAFXE6nPvJVVnpIxy0kWayRdW0NB7zxO+v0UWWdGNUVHBI3Zd7rRK2NmpPa4NA1d3fPJbRhueEQanUrTVuU/wAvf2KZbnkyvzJ7Th4AkD0W+Mdiqpua3PzJe5B9n+8fko5cl7TfIb61LBeNiG/YOPGQ/wArVap+U8z1Z/6/5InZ/Zd7p+CmOauT89sAoN+Sqnoi02L9Wz3G/AKJ8nTr+VHm22oRtqczoBxPyUlVTseEU+oa+Gjr3S7t8IgrdbpJiDI4nC0NaNzWjQAbl1YRUVhHz++6V1jslyzWWxEEBtXTbTBKyWlcJzHFpFHDxBK0shvi4klU9k1I6RLs3d9piBEEWF4q17Ghjs94c0Ag8vNcnxbISxk73hVWxylyUXaa57XYbK+ziRstke9paTUSMLT1lKaUOCpplXOgqa3KZxslux3KGohOmG3PwtlEVopE1sXZust1nbTLrA4/9sGT+lRXPEGTaeO62KO8LkHeCA072vKOzROmlNGtHiTua3iScltCDnLCNLLFCO5nA5bSJJnSyV7b3PcBxc4uI7s112mo4icWqUHbus457E/dU+J7HDIE/HJc+ccZTPYaS1WbZx4LQoTrm7cE4baoc8xKwH95wHzW9faSKevSlp7I+z/kuO2G2zbG7qY2iSagJqaNYDpipmTvpllTPMK3Ozb2PLaPQO9bpPETc2Fvqa1wOlmDARKWtwAtGENad5OdSVmuTkssi11EKLNkPQsakKYQBAEB5cwHUA96DODVvO3R2aF80hwsYKmnoAOJNABxKw2kjeuErJqK5ZwG/r2fa53zynNxyaMwxg9loPIb95JO9VZSy8np6KY1QUUbt02PCMZHaPoFDJnUorwsskWtJIAFSTQAaknQBak0pKKy+DqGy1yCyxVd+seKvPDg0ch8aq9XDajxfUNa9Tb2+VcfycDe4uJPEk8td6rnejwiduln2I5k5jvoo5cl+hZhgxdZLGe1Vw8/Xcs9mYTsg+/c6fsYP8MDxe4+tPkrFPynB6o86h/RE1Loe4/BSnOXJ+emAUGe5VT0RcLmsj5GxtaNWjM6AUGZKilyXndCutSZbxcsJhMLm4mu9o7ydxB3EbuCxGxxllHA1UvxOfE/9HNdoLkfZZMLs2H2H8RwPBw3hdam5WRyjzWo08qZYfHkRZKmID5RAfUBM3FtJNZatbR7Ca4HVoDxaR7PwUFunjZ3fJZo1U6ey49D5tDtBJa8Ic0Na2tGipqTkSSdcviUpojXwY1GpldjPkUeePC4t4H/AMKQ0Xcs3RxaYYbWZppGRsZC6hcQKvcWtAA1Jwl+ir6lOUMRLekcYz3SZdLx6S7IzKJskp4gYG+b6O8mlVY6Sb5Ls9bCPZJldm6SbRK8NAZZ4yaFwHWPbwNXdnWn3VN+FjFZ5ZFXrN9ijJ7YvzNC9rmt1pkGKYz1NGYnEZnLJlMLa13LNd1a7JYLeq6RqVmW5SjznOP0Ny9eja0WOz/pFpfH7bW9XGXOyIObnkCmYpQA66qWyzC7FHRaaNtqjPgjrO6jm0yAcMhyIVJnqYYi0kWpQnVNSyNcy0tfuDg6u6gIPxopIvgp3Qb3L1TJu9NkLdabZM/q8LHyuIkc5obgr2TQHF7NMqeW6d1ycji066iumKb7pce50647rZZYGQM0YMzvc4mrnHvJJU8VhYOLda7Zub8zfWSIIAgCAIDjPSVtMbVN1EZ+widrXKSQZE8w3MDxPBV7J57Hf6fpfDjvly/0RWrpsYe7Ec2t8iVBJ4OxRVueXwTyjLxddhbirS0yD/lA+r/kPE8Faor/ALmeb6zrs/6EH9f4/kudpdRjjwaT6Kyzz8Vlo/NEdS0Hl4KkevLLc5pE3eM/5io2+5eqhmCfmbtW8D/qH0WOxJifr+n+5fdkh/hWcy7+cq3V8qPMdR/+xL8v2Jd+h7lIUUfnuGMmgGpoAOJOQVU9F5ZZ2C57tFniawGrgAHO/EQPhyVeTyyhZY5vLN5YIyldIt4diKFpaQ8dYTkTQOoyh3VIdpw5ldHSVY+NnJ6ja8+H9yigK8csIAgCA9MaSQBqTQeKw3hZZtCEpyUI8vsWV/RhPNAJhLGJC0FjKOoQc6Of900PAjnvEXip8Fz8JODalyivy7KzWLt2kMa5wIjZiDzwc84cgADQb6urlhUVtnbCL3TtI5WbpcIxxWJszgwjLed4G+h3KqpuHdHenpK9R8Ml/JmGyLcVTKSzhhFe7FX5KT8W8cdyqv8A49BTy5/D6Y7/AH/2Oo7AXTjkM7h2Y8me+Rr4A+vJa0Qy9zJOtanZBUR8+foS3ShDiu6X9l0bvKVlfQlTWfKcbp8sXx/P9jiBJKrHo8lvEgIqR46H6KLJ0VFpZizw4g5gd1cys5xwa7HPvJnaLHJijY7i1p8wCuguDwdkds2vczLJoEAQBAEBVukm85LPYXGM0c9wjxbwHVxEcDQUrurVaWPES5oa42XJS+pw5jKkDuHcqp6RLLLXBC1jQ0aD86qI6MU0sIyUB3+f1TsZbkuV9iZj2ptjKN6wUAoBgjyG6lBopPGmjn/0rST74/VnuTa61uaWlzSCCD2RoRTcs+PI1/o2mTys/cqJuePi7zH0Ue9l78NA3LPCGNDRoOPfVat5JoRUVhGRDLaRYLq2nMMbYuqDg2ueOlaknTCeKmjdtWMHK1HS/Gsdm/Gfb/cl7r2m6+VsXVYcVc8VaUaTpQcFJG3c8YOfqemuit2bs49jkDQY5AaZsfXPLNjv7KMur4o/VHZLJaWysbIw1a4Ag9/zVZrBzmsPDMpCAqO12y7piJYT2msDOryAwtJIwHce0cjx3K7p9SorbI5ut0srZOyLy/MoD2FpIcCCDQgggg8CDouinng47TTwzysgIAgNm7m1lZ318gT8lDe8Vs6HSYb9ZWvfP27ndLuGGGOuVI215UaKqCPBfuebJfV/ucZ2pvY2q0vlr2PZjH7DdMuebvHkoJPLOxp6vDgk/wAzNc1nwtx0zdp3f3+ihkzqaeGFkkmipAyFTSp0HfyWqJ5PCbOi3ff1hs0TImy1wjcx5qdSdN5qVdVkIrGTyFuh1mosdkoc+pG7U7TWe0WWaBmMuewhpLaAHUE1zpUcFrO6LWCfTdI1MLIylhY9zmQuZx1eB3AlV96O7+GfmyWaMLRXcMz3BaFtLEe5r2GZ8hJA7I4AnPvWziQwuy+/BZW7S2xjGsEha1oDR2G6AUGZC38WaRT/AKZpJycmst9+SU2RvqeS1NbJK5zXNdkaUqBUGgHI+akpsk5YbKfVNDTVp91ccNNF/Vo8yEAQBAVjpDuia1WURQtDn9a11CWjIB1c3Gm8LSabXYt6K6NVu6XGDmJ2FvIOBNmJAI0kgyz99QOuXodqOv07fzfoydds5ax/kP8A4T8CovCn6HSXU9K/71+pidclqH+RL/oJ+Cx4U/Q3XUNM/wD9EY//AE6cZGCWn/Lfl3GibJeaH4mhvMbFn6o8SWGQZ4H031aW07wfksbGbx1VT7OS+6ZgwHu78vjqsbWSeLHyZ9qBpnz3eA3+PknZGcSlz2Q6x3E+fyTJlVxXkfMfHP4+aZMbEuOxL7Jt/wAUw8nfyH6qSpfEUOpy/wCmafqim7UWMx2y0MppK5w7n9sejgt5LDK2nluriyX2WvWSKPC0ggONWnMZ55cNVDNdy2tNC6HfleZcbDfMcmROF3A/I6FR4KF2jsr78r2JJYKpDbQbORWoVPYkAyeB6OH3h6qenUSr+hU1Gkhb34ZzW9bqlsz8EjafhOrXDi07+7ULqV2RmsxOJbVOt4khdl1zWh2GJhdTU5Bo73HId2qTsjBfExXVOx4iic/4FtNCccVaZAF2Z4Vw5KD8ZXkt/wBOtxnKMNzXQ4OAcKPcQ2lRVtTTMcVFfdvajHg9B0nQLS1vUWfNj7L+S/8ASDaXxWF+DLEWxuPBjjQ078m/vLM+0SppEpXLP1OQMFTnpXP5qA7S5LaKDIAfnkosnTUT7i5Dyp8EyNnoz7hB0Pgfrp8EwY3NfMjyRTVYNlJPgAIZbS7sSMFCDnUUpwrzG/8APJbcETzPt5HhjABQCgC1ySKKXBtWaxyvzjjkcOLWuI8wKLZRk+EQ230w7Tkl9WT+zF0WllpikdC9rQTiJAAoWuboc96mqhJSTaOV1HWUT08oRmm/L7nRlbPLBAEAQBAEAQBAEBB7cGl32v8A6eQebSPmtZ/KyxpP+/D6nABQaD89yqHqMlpsg+zZ7rfgFE+Tp1/KjKsG50O6buiMERdEwkxtJJa0k1aDwV2MVhdjyOovsV0sSfL8zbs9ghY7EyNjXDKoaAfRbKKXBBO+yaxKTa92UPpUuk4o7U0ZEdW/kRUsPjmK8mqOxeZd0FnMH9UVC5psL8J0d8Rp8/RQSXY7Onntlh+ZOqMvNo3rHe8sQoCHD8Lq08DqPXuRJZ7lHVaNWRbgsSJy7dooZTgJ6uT8D6CvuO0f4Z8lvKmSWV3R5/xdstli2y9H/h+ZIW2xxytwSNDm60I3jfyUcZSi8pm064zWJLJrttdnjwxNLRnQNaBQeWQWHl92Tw0s1DMY4SNwPHEcDnoQsYNMMgtlrIZbQZXZhhLidxea0p6nwCs0xy8nQ6jaqtOqo+f7E/tfdzrRZJYmNxPOEtFQKlr2uGZy3KxJZRxdPYq7FJnO2dH9vdqIm+9J/tDlF4bOi9dV7/Ys8Ox01BikjBpnTEfkFr4D9Sw+sQS7RZIWTYXEKun8mfUrZaf3K1nXWniMP1M8+yFkhbimneBxJY0E8sls6YLlkUesau17a4LP0b/yb137L2J7A9uKRh0Je6hzpoKBbqqGOxUu6jq1Jxl2f0Rxm1W2ZrnMMhycW0aGtrQkZ4QFXaO5GbklJskrplLo6k1NSM8/zqo5cnQok3Hubi1Jzo3R7JWzEfhlcPMNd81dofwHkOtxxqc+qRZ1McgIAgCAIAgCA1mynHy0QGygCAr3SA+l32n3APNzR81pP5WWdF/34fU4Ni4D6qqenLbBH2W0zyGW/T18FE16HQjPakpArBKmnwdbsFnrBFTURM8eyF0EuyPCW2Yun9X+5hnBFSNQNOIG5DPujDbLNHPE6N4qx4wuGh/sRkQe5Yaybwm4tSXJxnaPZ+Wxy4XZsJ+zk0Dh8nDePkoJRwdui9WrK5Nu7rwxjCT2h68woZJo6lVkZLD5N7Gd+ff9dVjJLsXl2Pj42uyNO5wr6/Wiynjhkc4KSxZFNf8APIyOLiKF1RzeCPisYZmPhx+WP6HkUGmZ9B9T+c04NsOfPZGawWKSZwjYK7zwHMrMYuTwiO+6uiO+R0W67A2CMRt3Zk73HeSrkYqKweVvvldNzkQd9ba2ezvMYDpHg0dhoGtO8Fx1PcCsOaRLTop2LLeF7mfZ/auG1u6trXskoThcAQQKVIcO8a0SM1IxfpJ0rL7osLG1NAtypJ4WSRY2gotyo3l5KxfWzctrtIe+QNhaAGtFcR3uy0FTv5BRTr3vvwdTSdQjpqXGMfifmWWCFrGhjRRrQAANwGQUiWDmSk5Nylyz89bRwYLXaWn/AOxKQORkc4ehCqy5Z6jTy3VRfsv2Nu4DVjhlk7TTUDf4b1FJHQ088Jkp1TvwnyK1wyx4kPUvXRw49XM0ilHg+baf0q1p+GeZ67h2wa9P8lsllw96sHDPYKA+oAgCAIAgMXU9qqAyoAgIXbG7JLVY5YIsON+CmIkN7MjXGpAJ0B3LWSysE+msjXapy4RzCTo1vDQCE90h+bQoPCkdn+p0e/2/3Jk7H2wCnVg9z2fMqPwJnQj1nS+r+x5fs1bgP1TvB7P9yx4VhldS0T8/0f8AB0yyMwsY06hoB8AArqPITeZNkPtq4tskjm69lteTntafQlaWvEW0XumRU9TGMuO/7EHC60NsEcsftgakVxRhxAyPKhrwCjTlsyXZQoesdb4/yat338y0jqLXGwtfkCR2Sd1RuPBw9FrG3PaRY1PTnUvEpb7eXmaF6dGzScVnmLN+B9SOVHjMeIJWzr9CvXr5L5l9jTZsteDMiyKQcWyUP8QFVG6X5F+HVoLnJtR7MWoipYByL2/Kq18GROuraf3+x7ZsraTuYO9w+SeDIPq2n9/sSFj2O3yyeDB/Ufot1R6lS3rDfauP3LNYrHHE3DG0NHqeZOpKnUUuDkW2ztlum8szObX+yyRlXfsDYy6o6wD8Ifl5kF3qtPDRcjrrYrCx9ifuq6YoG4IYw2utMyebnHM+K2SS4Ktt0pvdNk1BDh71ukU5z3GVZNAgCA4jttctodeNo6uzzPDntcCyORzc42E9oCmtd6rTi9zPRaS6tUR3SX39z1cOzFu7VbNIAaUxYW8a5EhRyqk/IuU9Q08M7p/uTsWx1rP+W1ve9vyqngTNpdZ0q82/yLRsjcctkMpkLKODaYST7OLWoHFT1VuHJxep66vVbdifbPJLudU1UxyTdh9kdyA9oAgCAIAgCAIAgCAIAgCAIDWlYyVpjeAWnIg6FYaybQnKElKLw0Z2sAFABQCgG6iyYy85Im07M2V7sRiaCdaVAPe0ZKN1RbzguQ6jqIR2qbwbTrK4aUK2wRK1eZjdGRqCsYN1JPzPCGwQBAEB9DSdEMNpGeOyk65LOCOVqXBtMYGhbYIHJvk9A1QweZn0BKM2isvBo9c7WpWmSxsjjg3YX1AK3RXksPBkQ1CAIDHP7JQGvDCT3IDcQBAEAQBAEAQBAEAQBAEAQBAar4iDUIDaQBAEAQHwtCA8mFvALGDbc/U+dQ3gmBvl6n0RN4BMDc/U9gLJqfCUBqODnHQoDaY2gogEjKiiGU8PJp/oruS1wT+KjcjZQUWyIG8vJ6QwQO0O1EdlLWlrnudmAMgADTN3yUc7FEvaLQy1OcPCRJ3XbOujbJgczF912vf3FbReVkrX1eFY4ZTx5o2iFsRH1AEAQBAEAQBAEAQBAEAQBAEAQBAEAQHiSMFAI2U3lAe0AQBAEB8QGOVrvulAfYXk6jNAZEAQBAEAQHl7AdQDTSoqhlNrg9IYCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgP/Z" alt="" />
    <NavLink to="/">
    <Button className="btn">go back</Button>
    </NavLink>
    
  </Wrapper>
  
  </>
  )
}
const Wrapper = styled.section`

padding: 9rem 0;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;


.btn{
    font-size: 1.8rem;
    margin-top: 3rem;

}

`;

export default Error
