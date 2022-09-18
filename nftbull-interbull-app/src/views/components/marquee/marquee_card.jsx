function MarqueeCard() {
    return (
        <div className="py-2 inline-block w-max dark:text-white">
            <a className="inline-block w-64" href="/goatz/indices/9f5d05d5-3f10-4438-a500-29d413f4e648">
                <div className="flex items-center w-full h-full">
                    <div className="w-10 ml-4">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden" style={{ background: 'rgb(241, 206, 105)' }}>
                            <img className="w-16 px-1.5" src="https://i.imgur.com/nMBgkj6.jpg" alt="" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 text-eval-white-edgar w-4/5 ml-4 h-12">
                        <div className="flex w-full">
                            <span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-left text-xs">Space Runners</span>
                        </div>
                        <div className="flex items-center w-full">
                            <div className="w-1/3 text-left text-xs">
                                <div style={{ fontSize: '12px' }}>
                                    <div>◎6.50</div>
                                    <div style={{ color: 'rgb(46, 242, 176)' }}>0%</div>
                                </div>
                            </div>
                            <div className="w-2/3 ml-2 mr-4">
                                <div className="w-full pt-2">
                                    <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAAtCAYAAACH13aqAAAAAXNSR0IArs4c6QAABcVJREFUeF7tnU1sVFUYht/3u3daQPqDBEwjC2OIInYaFyZEDSYEohEBQRMS925M3GjcwF5ZEI0LEzeuXRiBggZjBDFKQnThTxvRqDEuFEII0g5/tp17PnPu0Gn5mXZmYZnpfc+it/fec+d83/O975zen9wSaiIgAoueABd9hkpQBEQAMrpEIAIFICCjF6DISlEEZHRpQAQKQEBGL0CRlaIIyOjSgAgUgICMXoAiK0URkNGlAREoAAEZvQBFVooiIKNLAyJQAAIyegGKrBRFQEaXBkSgAARk9AIUWSmKgIwuDYhAAQjI6AUoslIUARldGhCBAhCoG/3B84d7ukrhRRqeBvgwyD7A/6bjWEA4PNr7/KkC8FCKItBRBMqVg48Z7DkntgC8F+7jgP/kAZ9lff0fnOamyzGh3OjlK0eeYRZeBrC9QZbnnHw3uzbxzunVu/MD1URABO4cgfV+YnlSGXuVxCsAVzeI5GN3f2+0b9enLFc+Wkek7wN4Yv6wfe9I76598/dTDxEQgf+TwFBleC+AN+YfgycBvMShyvB+AK/Pf0A+/19FwCk6/gl0N6cjAUIgCQ9eWwNpGUGLvzsY9ybB4QQCESyAUzQaQ62/g04PBliIv5BM4e617TAYrgRnt7mncVxabXsgJmNU5iiF2D02i8N6FXCYWRqjYhyapLtXHXAjS+4xlhiSwREyJyaMtsxDiBuZD82k6vBggSVH/Bwy5AMim9mOQIPFTzAyCwgxglreoAWEmEA8LP+RcyISBIAJsjhWHJINObkRliBc51TL5aq7d9c5xVBjIrfh5FkwJDaJ4GZkOpsTQ+SRY0vzhOucQjWyj5xC8BhADB8es/SbOZFO1jllcE8iJ3cyYayDRQXEcjIhb+QU2XusQw3QTZxIJGGaU/CItcbVzBAFZQgM03pqgtN1PYUk6sbNMs7oKTgD8nhjHXNOccAoRjqmIicD0lyTOSeje1Z1s2COrrqePBaD1bqeslpxc/3VOXkpMwtJiIKvcfKAJNfNNCfPaJ7keqr96R31NM0pWenMHge4tCnfAvtZrgyfITDQ5AHqJgIi0HkEzsQZvTYTqomACCxWAh6NPgpgcLFmqLxEoPAEiFGWK4feIvhaMzAIxHO0L0FcbKa/+oiACPwPBBwrQN+UXy1qorn72xwcO/yo0fchvw83V/N4le0Ega9meuWXK2YdpHXxkB4Wwh8OPAnHpvwa5py2xbHg3JNfTx0aO7QZCffAsbnBMQHE53Aeb+ILRF1EQAQWggB9MxxPTT8Pc8uQjuMwe3OkZ8cX9Sfjhq4eWIOpZAeAjSDWAhggcM0dfxL+C4BfFyJ2jSECItACAbMHPPg6Evc5sBSOszD+huAnUc2OjKx84a/4aQ2fdR8cP/CseTIAZEC83a2lOEgHbe0DZ3JmtG/n0dt9TTQ0evny8JYEvCfL5rB5Ami/+DScBqSPBfUH3M+N9u881pLRhyrDG0muyqoZkhTIqrhhiWp8niqB9ouP9NEe/rDEzo/07vy6NaOPD29IUru7WgXSFNBSHKSD9vaBlXjhx2Xbv23J6OsvHnrEUvTnM/d0SwGti4f0cJ1Am/khAGOnV+z6oSWjD146+JAF623h+p+6ioAI3EECqaWV73q2/dyS0ctjn9zvabYck1MASgCmgK4StC4e0kN7+oG25PJo/7Y/WjL60IUDa+yurqWYmOMrqhvQfvFpSED6WFB/hOrkten75jfXpOHttbWXPly1bDKJpVITARHoAAJJVzbxfc/u8y3N6Bv8aK9f+rdUATD7RF3r4iE9zFipnfzAniVT33BrDOmW1nhG96PdfWez5Gx8FnbWYVoXD+lhxhDt5IfxgST7nVtve7Ld+HXP8c1JeYuL2e+m0Lp4SA8zVm8zP8QXX7Uyo3fAKYlCFAERaJKA/oFDk6DUTQQ6mYCM3snVU+wi0CQBGb1JUOomAp1MQEbv5OopdhFoksB/wQQFavobnogAAAAASUVORK5CYII=" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default MarqueeCard;
