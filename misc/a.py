import csv
import html
with open('details.csv','r') as csvfile:
    reader = csv.reader(csvfile)
    rows = []
    for row in reader:
        rows.append(row)

#rows = [html.escape(x) for x in rows]
for r in rows[3:15]:
    print(f'<div class="float-left"><div class="single-team-member"><div class="img"><img src="res/blank-profile.png" alt="Image"><div class="opacity tran4s"><h4>{r[2]}</h4><span>{r[1]}</span><p>{r[3]}, {r[-1]}</p></div></div> <!-- /.img --><div class="member-name"><h6>{r[2]}</h6><p>{r[1]}</p><ul><!--li><a href="#" class="tran3s round-border"><i class="fa fa-facebook" aria-hidden="true"></i></a></li--><li><a href="mailto:{r[4]}@cam.ac.uk" class="tran3s round-border"><i class="fa fa-envelope" aria-hidden="true"></i></a></li></ul></div> <!-- /.member-name --></div> <!-- /.single-team-member --></div> <!-- /float-left -->')
#print(rows[3:15])