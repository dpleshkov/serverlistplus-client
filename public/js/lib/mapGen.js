// Map gen code ripped from the game ripped from Bhpsngum

(function(){
    var II0I0 = function() {
        function t(t) {
            var e, i, s, l;
            for (this.seed = t, this.table = [670, 243, 963, 607, 432, 29, 624, 809, 254, 752, 691, 904, 275, 984, 586, 94, 1014, 614, 252, 178, 488, 954, 55, 836, 186, 858, 719, 562, 685, 898, 167, 844, 639, 505, 85, 386, 520, 988, 561, 889, 91, 329, 900, 847, 334, 531, 168, 57, 789, 529, 259, 323, 313, 72, 153, 606, 694, 442, 547, 922, 242, 983, 965, 876, 39, 728, 383, 109, 343, 810, 815, 144, 457, 434, 221, 279, 328, 136, 674, 556, 502, 896, 582, 250, 665, 370, 926, 912, 118, 543, 365, 467, 311, 700, 15, 297, 609, 731, 476, 634, 715, 777, 62, 1007, 525, 942, 310, 627, 630, 448, 437, 822, 300, 339, 924, 583, 92, 800, 698, 312, 542, 740, 271, 778, 895, 447, 175, 957, 17, 481, 347, 283, 366, 277, 843, 966, 927, 535, 503, 234, 746, 712, 1010, 544, 671, 295, 978, 729, 997, 287, 621, 782, 160, 433, 537, 121, 413, 304, 98, 657, 498, 946, 319, 595, 191, 341, 554, 523, 274, 209, 435, 644, 947, 979, 397, 261, 681, 786, 1006, 565, 472, 180, 318, 126, 874, 693, 526, 276, 340, 808, 884, 409, 486, 962, 960, 772, 901, 690, 359, 837, 129, 363, 509, 616, 88, 382, 730, 513, 623, 999, 504, 48, 4, 384, 281, 560, 417, 99, 773, 956, 943, 496, 558, 218, 170, 471, 536, 138, 19, 266, 6, 868, 845, 16, 985, 866, 601, 445, 458, 894, 950, 349, 1017, 125, 495, 723, 446, 647, 834, 880, 272, 475, 483, 227, 357, 750, 851, 139, 406, 336, 158, 284, 482, 324, 991, 632, 587, 663, 74, 256, 541, 120, 801, 831, 46, 522, 589, 1, 571, 368, 137, 761, 885, 968, 982, 948, 785, 391, 840, 932, 829, 117, 641, 466, 367, 688, 733, 229, 735, 14, 205, 31, 316, 333, 183, 521, 795, 58, 1021, 282, 794, 939, 40, 394, 793, 1002, 763, 212, 484, 133, 260, 465, 396, 769, 518, 955, 497, 377, 145, 508, 514, 224, 196, 454, 176, 975, 865, 1005, 1023, 986, 596, 426, 893, 551, 90, 130, 873, 22, 709, 686, 436, 236, 661, 579, 764, 362, 141, 112, 970, 987, 12, 317, 369, 26, 344, 66, 803, 493, 716, 9, 637, 945, 225, 703, 78, 346, 751, 123, 1009, 1016, 27, 52, 864, 902, 921, 292, 314, 599, 799, 263, 626, 338, 953, 491, 892, 353, 692, 917, 540, 882, 677, 744, 633, 821, 327, 60, 1020, 928, 788, 360, 414, 430, 462, 824, 820, 727, 398, 342, 273, 726, 981, 84, 82, 206, 388, 720, 806, 652, 550, 238, 159, 134, 732, 897, 500, 881, 805, 814, 701, 717, 566, 7, 211, 604, 816, 56, 658, 107, 61, 374, 320, 501, 13, 642, 863, 791, 438, 348, 97, 214, 86, 305, 875, 656, 24, 364, 767, 156, 879, 590, 734, 920, 655, 577, 83, 584, 660, 38, 100, 299, 580, 990, 636, 944, 463, 766, 996, 714, 8, 515, 87, 198, 280, 444, 131, 404, 108, 278, 487, 223, 598, 410, 395, 199, 268, 989, 75, 195, 760, 916, 977, 421, 11, 1e3, 813, 216, 817, 823, 164, 668, 739, 572, 30, 707, 798, 291, 564, 77, 456, 478, 68, 643, 615, 172, 841, 672, 919, 1012, 613, 385, 980, 711, 771, 682, 232, 765, 143, 620, 631, 861, 468, 622, 201, 325, 424, 189, 608, 403, 775, 646, 673, 1013, 400, 859, 838, 345, 210, 860, 65, 63, 34, 755, 161, 479, 235, 783, 460, 826, 507, 854, 839, 666, 802, 441, 114, 443, 738, 770, 929, 857, 907, 741, 935, 949, 322, 995, 217, 667, 269, 184, 650, 1018, 506, 290, 787, 459, 721, 828, 567, 222, 494, 142, 743, 405, 76, 722, 588, 147, 899, 270, 695, 597, 337, 155, 569, 679, 853, 450, 21, 517, 197, 371, 257, 380, 244, 553, 952, 381, 827, 524, 877, 702, 306, 600, 1011, 431, 781, 594, 387, 1019, 411, 533, 659, 177, 725, 930, 933, 832, 41, 2, 687, 1008, 439, 307, 891, 871, 415, 651, 308, 298, 811, 0, 194, 592, 241, 918, 18, 973, 110, 654, 967, 490, 683, 914, 128, 992, 964, 122, 230, 149, 289, 392, 416, 852, 936, 262, 102, 938, 511, 255, 510, 165, 105, 419, 958, 294, 379, 49, 699, 330, 593, 539, 710, 106, 79, 440, 200, 704, 961, 326, 321, 759, 193, 890, 44, 549, 913, 776, 909, 552, 972, 132, 429, 748, 532, 115, 888, 635, 842, 649, 747, 807, 887, 856, 784, 148, 530, 116, 157, 372, 754, 28, 581, 67, 187, 202, 818, 181, 45, 959, 146, 124, 994, 872, 675, 706, 253, 247, 625, 570, 152, 423, 185, 361, 849, 971, 546, 412, 830, 1022, 188, 850, 140, 220, 451, 219, 768, 1015, 455, 780, 976, 449, 969, 848, 293, 249, 59, 390, 512, 538, 578, 906, 819, 862, 974, 33, 911, 135, 908, 248, 401, 951, 527, 169, 676, 640, 1003, 591, 103, 37, 285, 684, 104, 163, 753, 1004, 934, 645, 470, 774, 20, 489, 228, 461, 492, 469, 998, 296, 233, 869, 605, 315, 36, 5, 425, 878, 617, 886, 23, 355, 993, 93, 473, 555, 474, 464, 937, 925, 1001, 611, 35, 812, 174, 53, 286, 680, 267, 428, 335, 883, 653, 69, 718, 585, 749, 150, 408, 393, 915, 576, 664, 629, 756, 402, 638, 602, 245, 43, 545, 213, 303, 192, 70, 453, 910, 407, 742, 111, 548, 835, 452, 575, 903, 619, 376, 154, 302, 151, 804, 867, 574, 563, 239, 648, 179, 855, 378, 618, 264, 669, 427, 354, 399, 265, 50, 796, 166, 923, 825, 697, 534, 54, 173, 870, 792, 162, 713, 246, 89, 51, 350, 705, 251, 557, 237, 240, 736, 689, 203, 519, 73, 81, 628, 288, 331, 204, 528, 480, 389, 32, 418, 573, 757, 358, 215, 226, 42, 779, 231, 171, 190, 612, 301, 762, 708, 420, 846, 208, 485, 351, 790, 737, 10, 258, 309, 797, 127, 516, 559, 499, 352, 71, 758, 25, 568, 113, 3, 610, 101, 375, 96, 603, 745, 64, 80, 477, 332, 833, 940, 373, 905, 422, 182, 356, 941, 47, 119, 662, 931, 696, 95, 724, 678, 207], s = this.table.length, e = i = 0, l = s - 1; 0 <= l ? i <= l : i >= l; e = 0 <= l ? ++i : --i) this.table.push(this.table[e]);
            this.seed < 1 && (this.seed *= 1 << 30), this.size = 1024, this.normalize = 1 / 1023, this.l10Ol = 1023, this.IOI0O = this.seed & this.l10Ol, this.l1O0I = this.seed >> 10 & this.l10Ol, this.OOO00 = this.seed >> 20 & this.l10Ol, this.c2d = [], this.I0III = Math.cos(.3), this.O1l1I = Math.sin(.3)
        }
        return t.prototype.I1O1O = function(t, e, i) {
            var s;
            return s = (-2 * i + 3) * i * i, t * (1 - s) + e * s
        }, t.prototype.IO11O = function(t, e, i) {
            return t * (1 - i) + e * i
        }, t.prototype.noise1d = function(t) {
            var e, i, s, l;
            return l = Math.floor(t), e = t - l, l &= this.l10Ol, i = this.table[this.IOI0O + this.table[l]], s = this.table[this.IOI0O + this.table[l + 1]], this.I1O1O(i, s, e) * this.normalize
        }, t.prototype.OIOIl = function(t, e) {
            var i, s, l, n, a, o, r, h;
            return r = Math.floor(t), h = Math.floor(e), i = t - r, s = e - h, r &= this.l10Ol, h &= this.l10Ol, l = this.table[this.IOI0O + this.table[r + this.table[h + this.l1O0I]]], n = this.table[this.IOI0O + this.table[r + 1 + this.table[h + this.l1O0I]]], a = this.table[this.IOI0O + this.table[r + this.table[h + 1 + this.l1O0I]]], o = this.table[this.IOI0O + this.table[r + 1 + this.table[h + 1 + this.l1O0I]]], this.I1O1O(this.I1O1O(l, n, i), this.I1O1O(a, o, i), s) * this.normalize
        }, t.prototype.OIl1I = function(t, e, i) {
            var s, l, n, a, o, r, h, u, d, c, I, p, O, m, f, g;
            return m = Math.floor(t), f = Math.floor(e), g = Math.floor(i), s = t - m, l = e - f, n = i - g, m &= this.l10Ol, f &= this.l10Ol, g &= this.l10Ol, a = this.table[this.IOI0O + this.table[m + this.table[f + this.table[this.l1O0I + this.table[g + this.OOO00]]]]], o = this.table[this.IOI0O + this.table[m + 1 + this.table[f + this.table[this.l1O0I + this.table[g + this.OOO00]]]]], r = this.table[this.IOI0O + this.table[m + this.table[f + 1 + this.table[this.l1O0I + this.table[g + this.OOO00]]]]], h = this.table[this.IOI0O + this.table[m + 1 + this.table[f + 1 + this.table[this.l1O0I + this.table[g + this.OOO00]]]]], u = this.table[this.IOI0O + this.table[m + this.table[f + this.table[this.l1O0I + this.table[g + 1 + this.OOO00]]]]], d = this.table[this.IOI0O + this.table[m + 1 + this.table[f + this.table[this.l1O0I + this.table[g + 1 + this.OOO00]]]]], c = this.table[this.IOI0O + this.table[m + this.table[f + 1 + this.table[this.l1O0I + this.table[g + 1 + this.OOO00]]]]], I = this.table[this.IOI0O + this.table[m + 1 + this.table[f + 1 + this.table[this.l1O0I + this.table[g + 1 + this.OOO00]]]]], p = this.I1O1O(this.I1O1O(a, o, s), this.I1O1O(r, h, s), l), O = this.I1O1O(this.I1O1O(u, d, s), this.I1O1O(c, I, s), l), this.I1O1O(p, O, n) * this.normalize
        }, t.prototype.lOII0 = function(t, e, i) {
            var s, l, n, a, o, r, h, u, d, c, I, p, O, m, f, g;
            return m = Math.floor(t), f = Math.floor(e), g = Math.floor(i), s = t - m, l = e - f, n = i - g, m &= this.l10Ol, f &= this.l10Ol, g &= this.l10Ol, a = this.table[this.IOI0O + this.table[m + this.table[f + this.table[this.l1O0I + this.table[g + this.OOO00]]]]],
                o = this.table[this.IOI0O + this.table[m + 1 + this.table[f + this.table[this.l1O0I + this.table[g + this.OOO00]]]]], r = this.table[this.IOI0O + this.table[m + this.table[f + 1 + this.table[this.l1O0I + this.table[g + this.OOO00]]]]], h = this.table[this.IOI0O + this.table[m + 1 + this.table[f + 1 + this.table[this.l1O0I + this.table[g + this.OOO00]]]]], u = this.table[this.IOI0O + this.table[m + this.table[f + this.table[this.l1O0I + this.table[g + 1 + this.OOO00]]]]], d = this.table[this.IOI0O + this.table[m + 1 + this.table[f + this.table[this.l1O0I + this.table[g + 1 + this.OOO00]]]]], c = this.table[this.IOI0O + this.table[m + this.table[f + 1 + this.table[this.l1O0I + this.table[g + 1 + this.OOO00]]]]], I = this.table[this.IOI0O + this.table[m + 1 + this.table[f + 1 + this.table[this.l1O0I + this.table[g + 1 + this.OOO00]]]]], p = this.IO11O(this.IO11O(a, o, s), this.IO11O(r, h, s), l), O = this.IO11O(this.IO11O(u, d, s), this.IO11O(c, I, s), l), this.IO11O(p, O, n) * this.normalize
        }, t.prototype.II0l0 = function(t, e, i) {}, t.prototype.basic1d = function(t, e, i, s) {
            var l, n, a, o, r;
            for (null == e && (e = 5), null == i && (i = .5), null == s && (s = 1.9), r = 0, l = 1, a = 0, n = 1, o = e; n <= o; n += 1) r += this.noise1d(t) * l, a += l, l *= i, t *= s;
            return r / a
        }, t.prototype.IOOl1 = function(t, e, i, s, l, n, a) {
            var o, r, h, u, d, c, I;
            for (null == i && (i = 5), null == s && (s = .5), null == l && (l = 1.9), null == n && (n = this.I0III), null == a && (a = this.O1l1I), I = 0, o = 1, h = 0, r = 1, c = i; r <= c; r += 1) I += this.OIOIl(t, e) * o, h += o, o *= s, u = l * (t * n + e * a), d = l * (e * n - t * a), t = u, e = d;
            return I / h
        }, t.prototype.III1l = function(t, e, i, s, l, n, a, o) {
            var r, h, u, d, c, I, p;
            for (null == s && (s = 5), null == l && (l = .5), null == n && (n = 1.9), null == a && (a = this.I0III), null == o && (o = this.O1l1I), p = 0, r = 1, u = 0, h = 1, I = s; h <= I; h += 1) p += this.OIl1I(t, e, i) * r, u += r, r *= l, d = n * (t * a + e * o), c = n * (e * a - t * o), t = d, e = c, i *= n;
            return p / u
        }, t.prototype.periodicBasic1d = function(t, e, i, s, l) {
            var n, a, o, r;
            return null == i && (i = 5), null == s && (s = .5), null == l && (l = 1.9), a = Math.floor(t / e), n = t / e - a, o = this.basic1d(n * e, i, s, l), r = this.basic1d(n * e + e, i, s, l), this.I1O1O(o, r, 1 - n)
        }, t.prototype.lII1l = function(t, e, i, s, l, n, a, o) {
            var r, h, u, d, c, I, p, O;
            return null == s && (s = 5), null == l && (l = .5), null == n && (n = 1.9), null == a && (a = this.I0III), null == o && (o = this.O1l1I), u = Math.floor(t / i), d = Math.floor(e / i), r = t / i - u, h = e / i - d, c = this.IOOl1(r * i, h * i, s, l, n, a, o), I = this.IOOl1(r * i + i, h * i, s, l, n, a, o), p = this.IOOl1(r * i, h * i + i, s, l, n, a, o), O = this.IOOl1(r * i + i, h * i + i, s, l, n, a, o), this.I1O1O(this.I1O1O(c, I, 1 - r), this.I1O1O(p, O, 1 - r), 1 - h)
        }, t.prototype.turbulence2d = function(t, e, i, s, l, n, a) {
            var o, r, h, u, d, c, I;
            for (null == i && (i = 5), null == s && (s = .5), null == l && (l = 1.9), null == n && (n = this.I0III), null == a && (a = this.O1l1I), I = 0, o = 1, h = 0, r = 1, c = i; r <= c; r += 1) I += 2 * (.5 - Math.abs(.5 - this.OIOIl(t, e))) * o, h += o, o *= s, u = l * (t * n + e * a), d = l * (e * n - t * a), t = u, e = d;
            return I / h
        }, t.prototype.turbulence3d = function(t, e, i, s, l, n, a, o) {
            var r, h, u, d, c, I, p, O;
            for (null == s && (s = 5), null == l && (l = .5), null == n && (n = 1.9), null == a && (a = this.I0III), null == o && (o = this.O1l1I), O = 0, r = 1, u = 0, h = 1, p = s; h <= p; h += 1) O += 2 * (.5 - Math.abs(.5 - this.OIOIl(t, e, i))) * r, u += r, r *= l, d = n * (t * a + e * o), c = n * (e * a - t * o), I = n * i, t = d, e = c, i = I;
            return O / u
        }, t.prototype.periodicTurbulence2d = function(t, e, i, s, l, n, a, o) {
            var r, h, u, d, c, I, p, O;
            return null == s && (s = 5), null == l && (l = .5), null == n && (n = 1.9), null == a && (a = this.I0III), null == o && (o = this.O1l1I), u = Math.floor(t / i), d = Math.floor(e / i), r = t / i - u, h = e / i - d, c = this.turbulence2d(r * i, h * i, s, l, n, a, o), I = this.turbulence2d(r * i + i, h * i, s, l, n, a, o), p = this.turbulence2d(r * i, h * i + i, s, l, n, a, o), O = this.turbulence2d(r * i + i, h * i + i, s, l, n, a, o), this.I1O1O(this.I1O1O(c, I, 1 - r), this.I1O1O(p, O, 1 - r), 1 - h)
        }, t.prototype.O01Il = function(t, e, i, s, l, n, a) {
            var o, r, h, u, d, c, I, p, O;
            for (null == i && (i = 5), null == s && (s = .5), null == l && (l = 1.9), null == n && (n = this.I0III), null == a && (a = this.O1l1I), p = 0, o = 1, r = 1, u = 0, h = 1, I = i; h <= I; h += 1) O = 2 * this.OIOIl(t, e), O > 1 && (O = 2 - O), O = Math.pow(O, 2), p += o * r * O, o = O, u += r, r *= s, d = l * (t * n + e * a), c = l * (e * n - t * a), t = d, e = c;
            return p / u
        }, t.prototype.IIlO0 = function(t, e, i, s, l, n, a, o) {
            var r, h, u, d, c, I, p, O, m, f, g;
            for (null == s && (s = 5), null == l && (l = .5), null == n && (n = 1.9), null == a && (a = this.I0III), null == o && (o = this.O1l1I), f = 0, r = 1, h = 1, c = 0, u = 1, m = s; u <= m; u += 1) g = 2 * this.OIl1I(t, e, i), g > 1 && (g = 2 - g), g = Math.pow(g, 2), f += r * h * g, r = g, c += h, h *= l, I = t * a + e * o, p = e * a - t * o, d = p * a + i * o, O = i * a - p * o, t = n * I, e = n * d, i = n * O;
            return f / c
        }, t.prototype.O0llI = function(t, e, i) {
            var s, l, n, a, o, r, h, u, d, c, I, p, O, m, f, g, y, v, b, w, x, k, _, z, M, E, S;
            for (z = Math.floor(t), E = Math.floor(e), s = t - z, l = e - E, n = 100, a = 0, o = 0, r = 100, h = 0, u = 0, v = w = 0; w <= 2; v = w += 1)
                for (b = x = 0; x <= 2; b = x += 1) M = (z - 1 + v) % i, S = (E - 1 + b) % i, k = -1 + v + this.table[this.IOI0O + this.table[M + this.table[this.l1O0I + S]]] * this.normalize * .8 + .1, _ = -1 + b + this.table[this.IOI0O + this.table[M + this.table[this.l1O0I + this.table[S + 1]]]] * this.normalize * .8 + .1, p = s - k, f = l - _, d = p * p + f * f, d < n ? (r = n, h = a, u = o, n = d, a = k, o = _) : d < r && (r = d, h = k, u = _);
            return O = s - a, g = l - o, c = Math.sqrt(O * O + g * g), m = s - h, y = l - u, I = Math.sqrt(m * m + y * y), Math.min(c, I) / Math.max(c, I)
        }, t.prototype.O00II = function(t, e, i) {
            var s, l, n, a, o, r, h, u, d, c, I, p, O, m, f, g, y, v;
            for (f = Math.floor(t), y = Math.floor(e), s = t - f, l = e - y, n = 100, 0, 0, a = 0, u = c = 0; c <= 2; u = c += 1)
                for (d = I = 0; I <= 2; d = I += 1) g = (f - 1 + u) % i, v = (y - 1 + d) % i, p = -1 + u + this.table[this.IOI0O + this.table[g + this.table[this.l1O0I + v]]] * this.normalize * .8 + .1, O = -1 + d + this.table[this.IOI0O + this.table[g + this.table[this.l1O0I + this.table[v + 1]]]] * this.normalize * .8 + .1, m = this.table[this.IOI0O + this.table[g + this.table[this.l1O0I + this.table[v + 17]]]], r = s - p, h = l - O, (o = r * r + h * h) < n && (n = o, p, O, a = m);
            return a * this.normalize
        }, t.prototype.IIIOI = function(t, e, i, s) {
            var l, n, a, o, r, h, u, d, c, I, p, O, m, f, g, y, v, b, w, x, k, _, z, M, E, S, T, P, R, C, A, j, H, B, D, L, F, V;
            for (null == s && (s = 100), H = Math.floor(t), D = Math.floor(e), F = Math.floor(i), l = t - H, n = e - D, a = i - F, o = 100, r = 0, h = 0, u = 0, d = 100, c = 0, I = 0, p = 0, M = T = 0; T <= 2; M = T += 1)
                for (E = P = 0; P <= 2; E = P += 1) {
                    for (S = R = 0; R <= 2; S = R += 1) B = (H - 1 + M) % s & this.l10Ol, L = (D - 1 + E) % s & this.l10Ol, V = (F - 1 + S) % s & this.l10Ol, C = -1 + M + this.table[this.IOI0O + this.table[B + this.table[this.l1O0I + this.table[V + L]]]] * this.normalize, A = -1 + E + this.table[this.IOI0O + this.table[B + this.table[this.l1O0I + this.table[this.table[L + V] + 1]]]] * this.normalize, j = -1 + S + this.table[this.IOI0O + this.table[B + this.table[this.l1O0I + this.table[this.table[L + V] + 37]]]] * this.normalize;
                    g = l - C, b = n - A, k = a - j, O = g * g + b * b + k * k, O < o ? (d = o, c = r, I = h, p = u, o = O, r = C, h = A, u = j) : O < d && (d = O, c = C, I = A, p = j)
                }
            return y = l - r, w = n - h, _ = a - u, m = Math.sqrt(y * y + w * w + _ * _), v = l - c, x = n - I, z = a - p, f = Math.sqrt(v * v + x * x + z * z), Math.min(m, f) / Math.max(m, f)
        }, t.OllIO = function(t) {
            var e, i, s, l, n, a;
            for (n = [], e = s = 0, l = t - 1; 0 <= l ? s <= l : s >= l; e = 0 <= l ? ++s : --s) n[e] = e;
            for (a = [];;) {
                if (0 === n.length) break;
                i = Math.floor(Math.random() * n.length), a.push(n.splice(i, 1)[0])
            }
            return a
        }, t
    }(), lO1ll = function() {
        function t(t) {
            this.seed = null != t ? t : Math.random(), this.seed < 1 && (this.seed *= 1 << 30), this.a = 13971, this.b = 12345, this.size = 1 << 30, this.l10Ol = this.size - 1, this.O0IO0 = 1 / this.size, this.lOl10(), this.lOl10(), this.lOl10()
        }
        return t.prototype.next = function() {
            return this.seed = this.seed * this.a + this.b & this.l10Ol, this.seed * this.O0IO0
        }, t.prototype.OOOl1 = function(t, e) {
            return null != e ? Math.floor(Math.pow(this.next(), e) * t) : Math.floor(this.next() * t)
        }, t.prototype.lOl10 = function() {
            return this.seed = this.seed * this.a + this.b & this.l10Ol
        }, t.prototype.feed = function(t) {
            return this.seed = this.seed * this.a * t + this.b & this.l10Ol
        }, t
    }(), llOO1 = function() {
        function t(t, e, i) {
            var s, l, n, a, o, r;
            for (this.seed = null != t ? t : Math.random(), this.size = null != e ? e : 20, this.mode = i, this.random = new lO1ll(this.seed), this.I1l01 = 1e5 * this.random.next(), this.I01IO = 1e5 * this.random.next(), this.a = 13971, this.c = 12345, this.mod = 1 << 30, this.inv = 1 / this.mod, this.l10Ol = this.mod - 1, this.IlO1O = .5, this.OlO0O = .5, this.lO0l1 = 5, this.O1lIO = 1 + this.random.OOOl1(8), this.fx = this.O1lIO / this.size, this.fy = this.O1lIO / this.size, this.fx = (2 + 8 * this.random.next()) / (2 * this.size), this.fy = (2 + 8 * this.random.next()) / (2 * this.size), this.I000l = new II0I0(this.random.next()), this.Ol0I0 = 2 * this.size, this.buffer = [], this.custom_map = null, s = n = 0, o = this.Ol0I0 - 1; n <= o; s = n += 1)
                for (l = a = 0, r = this.Ol0I0 - 1; a <= r; l = a += 1) this.buffer[s + l * this.Ol0I0] = this.get(s - .5 * this.Ol0I0, l - .5 * this.Ol0I0)
        }
        return t.prototype.O10OI = function(t, e) {
            return t = (t + 3 * this.Ol0I0 / 2) % this.Ol0I0, e = (e + 3 * this.Ol0I0 / 2) % this.Ol0I0, this.buffer[t + this.Ol0I0 * e]
        }, t.prototype.getCustomMap = function(t, e) {
            var i, s, l, n;
            return e = -e - 1, null == this.custom_map && (this.custom_map = [], null != this.mode.options.custom_map && "string" == typeof this.mode.options.custom_map && (this.custom_map = this.mode.options.custom_map.split("\n"))), i = this.custom_map.length, i > 0 && (l = Math.floor(-i / 2), e >= l && e < l + i && (s = this.custom_map[e - l], i = s.length, l = Math.floor(-i / 2), t >= l && t < l + i && (n = s.charCodeAt(t - l) - 48) >= 0 && n <= 9)) ? n / 9 : 0
        }, t.prototype.get = function(t, e, i) {
            var s, l, n, a, o, r;
            return null == i && (i = {}), i.bx = t, i.by = e, o = t * this.I1l01 + e * this.I01IO, o = this.a * o + this.c & this.l10Ol, o = this.a * o + this.c & this.l10Ol, o = this.a * o + this.c & this.l10Ol, a = Math.sqrt((t * t + e * e) / (this.size * this.size)), r = 1, s = a > 1 ? .5 : .5 * Math.pow(a, this.lO0l1), s = s * this.OlO0O + (1 - this.OlO0O) * (this.I000l.lII1l((t + this.size) * this.fx, (e + this.size) * this.fy, this.O1lIO, 3) - .5), s = Math.max(4 / this.Ol0I0, s), null != this.mode && (s *= this.mode.asteroidsDensityModifier(2 * t / this.Ol0I0, 2 * e / this.Ol0I0), null != this.mode.options.custom_map) ? (i.size = .5 * this.getCustomMap(t, e), i.on = i.size > 0, o = this.a * o + this.c & this.l10Ol, l = o * this.inv, o = this.a * o + this.c & this.l10Ol, n = o * this.inv, l = l > .5 ? .5 * Math.pow(2 * (l - .5), .1) + .5 : .5 - .5 * Math.pow(2 * (.5 - l), .1), n = n > .5 ? .5 * Math.pow(2 * (n - .5), .1) + .5 : .5 - .5 * Math.pow(2 * (.5 - n), .1), i.x = t + i.size + l * (1 - 2 * i.size), i.y = e + i.size + n * (1 - 2 * i.size), i) : (o = this.a * o + this.c & this.l10Ol, o * this.inv < s ? (i.on = !0, o = this.a * o + this.c & this.l10Ol, i.size = (.1 + this.IlO1O * o * this.inv) * r, o = this.a * o + this.c & this.l10Ol, l = o * this.inv, o = this.a * o + this.c & this.l10Ol, n = o * this.inv, l = l > .5 ? .5 * Math.pow(2 * (l - .5), .1) + .5 : .5 - .5 * Math.pow(2 * (.5 - l), .1), n = n > .5 ? .5 * Math.pow(2 * (n - .5), .1) + .5 : .5 - .5 * Math.pow(2 * (.5 - n), .1), i.x = t + i.size + l * (1 - 2 * i.size), i.y = e + i.size + n * (1 - 2 * i.size)) : i.on = !1, i)
        }, t
    }(), installed_modes = [
        {
            name: "Survival",
            options: {},
            asteroidsDensityModifier: function (t, e) { return 1 }
        },
        {
            name: "Team",
            options: {teams: [1,1]},
            asteroidsDensityModifier: function(t, e) {
                var i, s;
                return i = Math.sqrt(t * t + e * e), s = .5 * Math.sqrt(2), null != this.options.teams && 1 === this.options.teams.length && (s = 0), i = Math.abs(i - s), i < .15 ? 0 : 1
            }
        }
    ], createMapByID = function(mapID, mapSize, gameMode) {
        var size = mapSize, edge = size/2, t = new llOO1(mapID, edge, installed_modes[gameMode]), map = [...new Array(size)].map(i=> new Array(size).fill(0)), f = {};
        for (let i = -edge; i < edge; i++) {
            for (let j = -edge; j < edge; j++) {
                t.get(i,j,f);
                if (f.on) map[Math.trunc(edge-f.y-0.1)][Math.trunc(f.x+edge)] = Math.max(Math.min(Math.round(f.size*100/6),9),1);
            }
        }
        return map;
    }
    bindIDMapper = function(object) {
        Object.assign(object.IDMapper, {
            createMapByID: createMapByID,
            installed_modes: installed_modes
        });
    }
    window.getMap = function(mapID, mapSize, mode) {
        let gamemode;
        if (mode === "team") {
            gamemode = 1;
        } else {
            gamemode = 0;
        }
        let rawMap = createMapByID(mapID, mapSize, gamemode);
        let stringArr = [];
        for (let row of rawMap) {
            let rowStr = "";
            for (let asteroid of row) {
                rowStr = rowStr + asteroid;
            }
            stringArr.push(rowStr);
        }
        return stringArr.join("\n");
    }
})();